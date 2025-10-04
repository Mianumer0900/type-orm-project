import * as express from "express";
import { userValaditor } from "../middleware/user.validator.js";
import { loginValidator } from "../middleware/login.valiator.js";
import { AuthController } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginValidator, AuthController.loginUser);
router.post("/register", userValaditor, AuthController.registerUser);

export { router as AuthRouter };
