import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Role } from '../../../schemas/user.schema';

export class CreateUserDto {
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
