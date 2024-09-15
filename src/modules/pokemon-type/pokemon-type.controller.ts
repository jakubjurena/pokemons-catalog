import { Controller, Get, Logger, Query } from '@nestjs/common';
import { PokemonTypeFilterDto } from './dto/pokemon-type-filter.dto';
import { PokemonTypeService } from './pokemon-type.service';

export const POKEMON_TYPE_ENDPOINT = 'pokemon-type';
@Controller(POKEMON_TYPE_ENDPOINT)
export class PokemonTypeController {
  private readonly logger: Logger = new Logger(PokemonTypeController.name);

  constructor(private readonly pokemonTypeService: PokemonTypeService) {}

  @Get()
  findAll(@Query() filter: PokemonTypeFilterDto) {
    this.logger.verbose(
      `GET: "/${POKEMON_TYPE_ENDPOINT}" - Returning all pokemon types with filter: ${JSON.stringify(filter)}`,
    );
    return this.pokemonTypeService.findAll(filter);
  }
}
