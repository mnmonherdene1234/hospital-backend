import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { BonusType } from 'src/schemas/bonus.schema';
import { CreateBonusDto } from './create-bonus';

export class UpdateBonusDto extends CreateBonusDto {
  id: string;

  @IsOptional()
  @IsEnum(BonusType)
  type: BonusType;

  @IsOptional()
  @IsPositive()
  discount: number;

  @IsOptional()
  @IsPositive()
  condition: number;
}
