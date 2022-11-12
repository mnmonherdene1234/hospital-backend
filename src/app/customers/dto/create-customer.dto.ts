import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class createCustomerDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  created_by: string;
  updated_by: string;
}
