import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Experience, WorkingHours } from 'src/schemas/doctor.schema';

export class CreateDoctorDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  experiences_desc: string;

  @IsUrl()
  @IsOptional()
  profile_img: string;

  @IsNumber()
  @IsOptional()
  salary: number;

  working_hours: WorkingHours[];
  experiences: Experience[];

  created_by: string;
  updated_by: string;
}
