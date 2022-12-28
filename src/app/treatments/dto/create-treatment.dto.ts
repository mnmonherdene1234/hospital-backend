import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

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

  @IsDate()
  date: Date;

  bonus: string;
  discount: number;

  created_by: string;
  updated_by: string;
}
