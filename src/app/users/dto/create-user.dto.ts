import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Role } from '../../../schemas/user.schema';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsNumberString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsAlphanumeric()
  @MinLength(2)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: string;

  @IsUrl()
  @IsOptional()
  profile_img: string;

  created_by: string;
  updated_by: string;
}
