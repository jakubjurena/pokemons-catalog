import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';
import { IsIntString } from 'src/common/decorators/IsIntString.decorator';
import { TransformValueToBoolean } from 'src/common/decorators/TransformToBoolean.decorator';

/**
 * PokemonFilterDto
 * @description A data transfer object that represents the pokemon filter
 */
export class PokemonFilterDto {
  @ApiProperty({
    description: 'The name of the pokemon',
    example: 'Pikachu',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The type ids of the pokemon',
  })
  @IsOptional()
  @IsIntString({ each: true })
  pokemonTypeIds?: number[];

  @ApiProperty({
    description: 'The favorite status of the pokemon',
  })
  @IsOptional()
  @TransformValueToBoolean()
  @IsBoolean()
  isFavorite?: boolean;
}

export class PokemonFilterPaginatedDto extends IntersectionType(
  PaginationDto,
  PokemonFilterDto,
) {}
