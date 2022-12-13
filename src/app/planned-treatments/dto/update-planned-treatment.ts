import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePlannedTreatmentDto } from './create-planned-treatment';

export class UpdatePlannedTreatmentDto extends CreatePlannedTreatmentDto {
  @IsOptional()
  @IsString()
  customer: string;

  @IsOptional()
  @IsString()
  basic_service: string;

  @IsOptional()
  @IsNumber()
  basic_input: number;
}
