import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';

/**
 * PokemonFilterDto
 * @description A data transfer object that represents the pokemon filter
 * @property name - The name of the pokemon
 * @property typeIds - The type ids of the pokemon
 * @property isFavorite - The favorite status of the pokemon
 */
export class PokemonFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt({ each: true })
  pokemonTypeIds?: number[];

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}
