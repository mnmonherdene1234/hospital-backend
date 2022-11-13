import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

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

  created_by: string;
  updated_by: string;
}
