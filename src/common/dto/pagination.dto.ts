import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * PaginationDto
 * @description A data transfer object that represents the pagination
 * @property page - The page number
 * @property pageSize - The number of items per page
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @IsInt()
  pageSize: number = 10;
}
