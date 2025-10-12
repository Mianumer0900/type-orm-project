import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User.entity";
import { UserService } from "../service/user.service";
import { Appointment } from "../entity/Appointment.entity";
import { AppointmentService } from "../service/Appointment.service";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);
export const appointmentRepository = new AppointmentService(
  AppDataSource.getRepository(Appointment)
);
