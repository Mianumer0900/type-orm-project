import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
} from "class-validator";

export class AppointmentDto {
  @IsDefined()
  @IsInt()
  doctorId: number;

  @IsDefined()
  @IsInt()
  patientId: number;

  @IsDefined()
  @IsNotEmpty()
  appointmentDate: Date;

  @IsOptional()
  @IsString()
  age: number;

  @IsOptional()
  @IsString()
  status: string;
}
