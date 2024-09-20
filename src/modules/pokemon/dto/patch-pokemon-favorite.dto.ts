import { IsBoolean } from 'class-validator';

/**
 * PatchPokemonFavoriteDto
 * @description A data transfer object that represents the pokemon favorite patch data
 */
export class PatchPokemonFavoriteDto {
  @IsBoolean()
  isFavorite: boolean;
}
