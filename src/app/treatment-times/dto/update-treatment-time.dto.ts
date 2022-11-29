import { IsOptional, IsString } from 'class-validator';
import { CreateTreatmentTimeDto } from './create-treatment-time.dto';

export class UpdateTreatmentTimeDto extends CreateTreatmentTimeDto {
  id: string;

  @IsOptional()
  @IsString()
  doctor: string;

  @IsOptional()
  @IsString()
  customer_phone: string;

  @IsOptional()
  @IsString()
  start_time: Date;

  @IsOptional()
  @IsString()
  end_time: Date;
}
