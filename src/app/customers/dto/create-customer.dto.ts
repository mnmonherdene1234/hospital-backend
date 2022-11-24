import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
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

  @MinLength(8)
  @IsNumberString()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

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
  address: string;

  @IsString()
  @IsOptional()
  image: string;

  created_by: string;
  updated_by: string;
}
