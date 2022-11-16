import { IsString } from 'class-validator';

export class CreateTreatmentTimeDto {
  @IsString()
  doctor: string;

  @IsString()
  customer_phone: string;

  @IsString()
  start_time: Date;

  @IsString()
  end_time: Date;

  customer: string;
  created_by: string;
  updated_by: string;
}
