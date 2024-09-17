import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';
import { IsIntString } from 'src/common/decorators/IsIntString.decorator';
import { TransformValueToBoolean } from 'src/common/decorators/TransformToBoolean.decorator';

/**
 * PokemonFilterDto
 * @description A data transfer object that represents the pokemon filter
 * @property {string} name - The name of the pokemon
 * @property {number[]} typeIds - The type ids of the pokemon
 * @property {boolean} isFavorite - The favorite status of the pokemon
 */
export class PokemonFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIntString({ each: true })
  pokemonTypeIds?: number[];

  @IsOptional()
  @TransformValueToBoolean()
  @IsBoolean()
  isFavorite?: boolean;
}
