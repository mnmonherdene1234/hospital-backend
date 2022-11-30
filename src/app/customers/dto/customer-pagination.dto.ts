import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CustomerType, Gender, Rate } from 'src/schemas/customer.schema';

export class CustomerPaginationDto {
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsEnum(Rate)
  rate: Rate;

  @IsOptional()
  @IsEnum(CustomerType)
  type: CustomerType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page_size: number = 25;
}
