import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.entity.js";
import { UserService } from "../service/user.service.js";


export const userRepository = new UserService(
    AppDataSource.getRepository(User)
);