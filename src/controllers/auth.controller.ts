import { Response, Request } from "express";
import { userRepository } from "../repository/index.js";
import Encrypt from "../helpers/encrypt.helper.js";

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

    const token = await Encrypt.generateToken({ id: user.id });
    const refreshToken = await Encrypt.generateRefreshToken({ id: user.id });
    return res.status(200).json({ user, token, refreshToken });
  }

  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ message: "Refresh Token Required" });
    }

    try {
      const payload = await Encrypt.verifyToken(refreshToken);
      const newToken = await Encrypt.generateToken({ id: payload.id });
      const newRefreshToken = await Encrypt.generateRefreshToken({
        id: payload.id,
      });
      return res
        .status(200)
        .json({ token: newToken, refreshToken: newRefreshToken });
    } catch (error) {
      return res.status(401).json({ message: "Invalid Refresh Token" });
    }
  }
}
