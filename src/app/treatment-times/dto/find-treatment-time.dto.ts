import { IsDateString, IsObject, IsOptional, IsString } from 'class-validator';

export class FindTreatmentTimeDto {
  @IsString()
  @IsOptional()
  doctor_id: string;

  @IsString()
  @IsOptional()
  customer_search: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;
}
