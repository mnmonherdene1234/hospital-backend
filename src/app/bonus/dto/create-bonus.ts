import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { BonusType } from 'src/schemas/bonus.schema';

export class CreateBonusDto {
  @IsEnum(BonusType)
  type: BonusType;

  @IsPositive()
  discount: number;

  @IsPositive()
  condition: number;

  created_by: string;
  updated_by: string;
}
