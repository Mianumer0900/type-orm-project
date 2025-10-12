import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import { userRouter } from "./routes/user.routes";
import { AuthRouter } from "./routes/auth.routes";
import { AppointmentRouter } from "./routes/appointment.routes";
import { TestEmailRouter } from "./routes/testEmail.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", AuthRouter);
app.use("/api", AppointmentRouter);
app.use("/api", TestEmailRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
