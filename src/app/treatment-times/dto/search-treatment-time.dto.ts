import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchTreatmentTimeDto {
  @IsOptional()
  @IsString()
  start_date: Date;

  @IsOptional()
  @IsString()
  end_date: Date;

  @IsOptional()
  @IsString()
  doctor: string;

  @IsOptional()
  @IsString()
  customer_phone: string;

  page: number;

  page_size: number;
}
