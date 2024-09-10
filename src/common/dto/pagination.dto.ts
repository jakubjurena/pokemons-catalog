import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * PaginationDto
 * @description A data transfer object that represents the pagination
 * @property {number} skip - The number of items to skip
 * @property {number} take - The number of items to take
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @IsInt()
  skip: number = 0;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  take: number = 10;
}
