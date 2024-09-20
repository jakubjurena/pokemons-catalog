import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/**
 * PatchPokemonFavoriteDto
 * @description A data transfer object that represents the pokemon favorite patch data
 */
export class PatchPokemonFavoriteDto {
  @ApiProperty({
    description: 'The favorite status of the pokemon',
  })
  @IsBoolean()
  isFavorite: boolean;
}
