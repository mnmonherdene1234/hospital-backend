import { IsDateString, IsOptional } from 'class-validator';
import { CreateTreatmentDto } from './create-treatment.dto';

export class UpdateTreatmentDto extends CreateTreatmentDto {
  id: string;

  @IsOptional()
  @IsDateString()
  start_time: Date;

  @IsOptional()
  @IsDateString()
  end_time: Date;
}
