import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { User } from "./User.entity";
  import { Appointment } from "./Appointment.entity";
  
  @Entity({ name: "doctors" })
  export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => User)
    @JoinColumn()
    user: User;
  
    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
  
    @Column({ nullable: true })
    mobile: string;
  
    @Column({ nullable: true })
    department: string;
  
    @Column({ nullable: true })
    designation: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  