import { IsNumberString, IsOptional, MinLength } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends CreateCustomerDto {
  id: string;

  @IsOptional()
  @MinLength(8)
  @IsNumberString()
  phone: string;
}
