import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/schemas/user.schema';

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

  created_by: string;
  updated_by: string;
}
