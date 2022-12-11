import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import {
  BloodType,
  FamilyStatus,
  Gender,
  Rate,
} from 'src/schemas/customer.schema';

export class CreateCustomerDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  first_name: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  last_name: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  registration_number: string;

  @IsOptional()
  @IsString()
  employment: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsOptional()
  birthday: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  blood_type: BloodType;

  @IsOptional()
  @IsEnum(FamilyStatus)
  family_status: FamilyStatus;

  @IsOptional()
  @IsEnum(Rate)
  rate: Rate;

  @IsString()
  @IsOptional()
  image: string;

  @IsOptional()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsString({ each: true })
  food_advice_images: string[];

  @IsOptional()
  @IsString({ each: true })
  skin_care_images: string[];

  created_by: string;
  updated_by: string;
}
