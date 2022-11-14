import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class createCustomerDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name: string;

  @MinLength(8)
  @IsNumberString()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  created_by: string;
  updated_by: string;
}
