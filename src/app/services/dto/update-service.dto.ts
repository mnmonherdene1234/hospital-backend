import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ServiceType } from 'src/schemas/service.schema';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends CreateServiceDto {
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsEnum(ServiceType)
  type: ServiceType;
}
