import { IsDate, IsString } from 'class-validator';

export class CreateTreatmentTimeDto {
  @IsString()
  doctor: string;

  @IsString()
  customer_phone: string;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;

  customer: string;
  created_by: string;
  updated_by: string;
}
