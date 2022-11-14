import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CustomerSearchDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumberString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
