import { IsDate, IsOptional, IsString } from 'class-validator';

export class FindTreatmentTimeDto {
  @IsString()
  @IsOptional()
  doctor_id: string;

  @IsString()
  @IsOptional()
  customer_search: string;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;
}
