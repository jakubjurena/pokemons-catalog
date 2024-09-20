import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * PaginationDto
 * @description A data transfer object that represents the pagination
 */
export class PaginationDto {
  @ApiProperty({
    description: 'The number of items to skip',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @IsInt()
  skip: number = 0;

  @ApiProperty({
    description: 'The number of items to take',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  take: number = 10;
}
