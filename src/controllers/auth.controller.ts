import { Response, Request } from "express";
import { userRepository } from "../repository";
import Encrypt from "../helpers/encrypt.helper";
import { OtpHelper } from "../helpers/otp.helper";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    const user = await userRepository.createUser(req.body);
    res.status(201).json(user);
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);

    if (!user || !(await Encrypt.comparedPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    await OtpHelper.setOtpForUser(user.id);

    return res.status(200).json({
      message: "OTP has been sent to your registered email. Please verify.",
    });
  }

  static async verifyOtp(req: Request, res: Response) {
    const { email, otp } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = OtpHelper.isOtpValid(user, Number(otp));
    console.log(isValid);
    if (!isValid)
      
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const token = await Encrypt.generateToken({ id: user.id });
    const refreshToken = await Encrypt.generateRefreshToken({ id: user.id });

    return res.status(200).json({
      message: "Login successful",
      user,
      token,
      refreshToken,
    });
  }

  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh Token Required" });

    try {
      const payload = await Encrypt.verifyToken(refreshToken);
      const newToken = await Encrypt.generateToken({ id: payload.id });
      const newRefreshToken = await Encrypt.generateRefreshToken({
        id: payload.id,
      });
      return res.status(200).json({
        token: newToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      return res.status(401).json({ message: "Invalid Refresh Token" });
    }
  }
  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    await OtpHelper.setOtpForUser(user.id);

    return res.status(200).json({
      message: "An OTP has been sent to your email for password reset.",
    });
  }

  static async verifyForgotOtp(req: Request, res: Response) {
    const { email, otp } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = OtpHelper.isOtpValid(user, Number(otp));
    if (!isValid)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    return res.status(200).json({
      message: "OTP verified successfully. You can now reset your password.",
    });
  }

  static async resetPassword(req: Request, res: Response) {
  const { email, otp, newPassword } = req.body;

  const user = await userRepository.findByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = OtpHelper.isOtpValid(user, Number(otp));
  if (!isValid)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  const hashedPassword = await Encrypt.hashPassword(newPassword);

  await userRepository.updateUser(user.id, {
    password: hashedPassword,
    otpCode: null,
    otpExpiredAt: null,
    otpGeneratedAt: null,
  });

  return res.status(200).json({ message: "Password reset successful!" });
}

}
