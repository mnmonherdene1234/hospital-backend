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
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  experiences_desc: string;

  @IsString()
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
