import { IsNumberString, IsOptional, MinLength } from 'class-validator';
import { createCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends createCustomerDto {
  id: string;

  @IsOptional()
  @MinLength(8)
  @IsNumberString()
  phone: string;
}
