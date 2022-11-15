import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Experience, WorkingHours } from 'src/schemas/doctor.schema';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsUrl()
  profile_img: string;

  @IsNumber()
  @IsOptional()
  salary: number;

  working_hours: WorkingHours[];
  experiences: Experience[];

  created_by: string;
  updated_by: string;
}
