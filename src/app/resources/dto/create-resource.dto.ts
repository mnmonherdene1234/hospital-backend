import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsNumber()
  quantity: number;

  created_by: string;
  updated_by: string;
}
