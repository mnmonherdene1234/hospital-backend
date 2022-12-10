import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreatePlannedTreatmentDto {
  @IsString()
  customer: string;

  @IsString()
  basic_service: string;

  @IsNumber()
  basic_input: number;

  @IsString()
  additional_service: string;

  @IsNumber()
  additional_input: number;

  @IsDateString()
  date: Date;

  created_by: string;
  updated_by: string;
}
