import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class Pagination {
  @IsNumber()
  @Min(1)
  page: number = 1;
  @IsNumber()
  @Min(1)
  pageSize: number = 100;
}

export default class QueryDto {
  @IsObject()
  @IsOptional()
  filter: any = {};

  @IsString()
  @IsOptional()
  sort: string = '';

  @IsOptional()
  populate: string | string[] = ['created_by', 'updated_by'];

  @IsOptional()
  select: any = "";

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Pagination)
  pagination: Pagination = {
    page: 1,
    pageSize: 100,
  };
}
