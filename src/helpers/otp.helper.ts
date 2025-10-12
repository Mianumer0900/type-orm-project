import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User.entity";
import { userRepository } from "../repository";
import { sendEmail } from "./mail.helper";

export class OtpHelper {
  static generateOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  static async setOtpForUser(userId: number) {
    const otpCode = this.generateOtp();
    const otpGeneratedAt = new Date();
    const otpExpiredAt = new Date(otpGeneratedAt.getTime() + 5 * 60 * 1000); 

    
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.otpCode = otpCode;
    user.otpGeneratedAt = otpGeneratedAt;
    user.otpExpiredAt = otpExpiredAt;

    await userRepo.save(user);

    await sendEmail(
      user.email,
      "Your OTP Code",
      `
        <h2>OTP Verification</h2>
        <p>Your OTP code is <strong>${otpCode}</strong></p>
        <p>This code will expire in <strong>5 minutes</strong>.</p>
      `
    );

    return {
      otpCode,
      otpExpiredAt,
    };
  }

  static isOtpValid(user: User, otp: number): boolean {
    const now = new Date();
    return user.otpCode === otp && user.otpExpiredAt > now;
  }
}
