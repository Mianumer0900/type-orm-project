import * as express from "express";
import { appointmentValidator } from "../middleware/appointment.validator";
import { AppointmentController } from "../controllers/appointments.controller";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { userRoles } from "../enum/user.roles";

const router = express.Router();

router.post(
  "/appointment",
  authentification,
  authorization([userRoles.DOCTOR, userRoles.PATIENT]),
  appointmentValidator,
  AppointmentController.createAppointment
);

export { router as AppointmentRouter };
