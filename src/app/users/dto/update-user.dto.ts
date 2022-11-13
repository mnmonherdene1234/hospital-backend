import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
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

  @IsEnum(Role)
  @IsNotEmpty()
  @IsOptional()
  role: string;

  created_by: string;

  updated_by: string;
}
