import { Request, Response, NextFunction } from "express";
import Encrypt from "../helpers/encrypt.helper";

export const authentification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decode = Encrypt.verifyToken(token);
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.headers["users"]= decode;
  next();
};
