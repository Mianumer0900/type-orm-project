import { plainToClass } from "class-transformer";
import { validate, Validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { UserDto } from "../dto/user.dto";

export const userValaditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userDto = plainToClass(UserDto, req.body);
  const errors: ValidationError[] = await validate(userDto);

  if (errors.length > 0) {
    const errorsMessage = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();
    return res.status(400).json({ errors: errorsMessage });
  } else {
    next();
  }
};
