import { IsDateString, IsOptional } from 'class-validator';
import { CreateTreatmentDto } from './create-treatment.dto';

export class UpdateTreatmentDto extends CreateTreatmentDto {
  id: string;

  @IsOptional()
  @IsDateString()
  date: Date;
}
