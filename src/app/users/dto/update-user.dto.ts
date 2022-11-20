import {
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
import { Role } from 'src/schemas/user.schema';

export class UpdateUserDto {
  id: string;

  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  @MinLength(2)
  username: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;

  @IsOptional()
  @IsNumberString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @IsOptional()
  role: string;

  @IsUrl()
  @IsOptional()
  profile_img: string;

  created_by: string;

  updated_by: string;
}
