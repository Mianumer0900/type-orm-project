import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/index";

export const authorization =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req.headers["user"] as any) || null;
    if (!user?.id) {
      return res.status(401).json({ message: "Unauthorized - no user found" });
    }

    const userData = await userRepository.findById(user.id);

    if (!userData || !roles.includes(userData.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };

