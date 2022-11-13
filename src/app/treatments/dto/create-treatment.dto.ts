import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  @IsNotEmpty()
  doctor: string;

  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  start_time: Date;

  @IsString()
  @IsNotEmpty()
  end_time: Date;

  created_by: string;
  updated_by: string;
}
