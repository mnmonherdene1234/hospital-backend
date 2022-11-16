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

  created_by: string;
  updated_by: string;
}
