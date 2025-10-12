import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error Occured:", err.stack);
  res
    .status(500)
    .json({
      status: "error",
      message: "Internal Server Error",
      error: err.message,
    });
};

export default errorHandler;
