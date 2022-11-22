import { IsNumber, IsPositive, IsString, IsUrl, Min } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  created_by: string;
  updated_by: string;
}
