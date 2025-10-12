import * as express from "express";
import { userValaditor } from "../middleware/user.validator";
import { loginValidator } from "../middleware/login.valiator";
import { AuthController } from "../controllers/auth.controller";
const router = express.Router();

router.post("/login", loginValidator, AuthController.loginUser);
router.post("/register", userValaditor, AuthController.registerUser);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/verify-forgot-otp", AuthController.verifyForgotOtp);
router.post("/reset-password", AuthController.resetPassword);

export { router as AuthRouter };
