import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { ServiceResource, ServiceType } from 'src/schemas/service.schema';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images: string;

  @IsEnum(ServiceType)
  type: ServiceType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services: string;

  @IsOptional()
  @IsArray()
  resources: ServiceResource[];

  created_by: string;
  updated_by: string;
}
