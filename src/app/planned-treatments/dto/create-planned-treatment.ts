import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlannedTreatmentDto {
  @IsString()
  customer: string;

  @IsString()
  basic_service: string;

  @IsNumber()
  basic_input: number;

  @IsOptional()
  @IsString()
  additional_service: string;

  @IsOptional()
  @IsNumber()
  additional_input: number;

  created_by: string;
  updated_by: string;
}
