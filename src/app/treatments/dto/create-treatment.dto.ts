import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  @IsNotEmpty()
  doctor: string;

  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsString({ each: true })
  @IsArray()
  services: string[];

  price: number;

  @IsDateString()
  start_time: Date;

  @IsDateString()
  end_time: Date;

  created_by: string;
  updated_by: string;
}
