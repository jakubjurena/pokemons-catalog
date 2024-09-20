import { Controller, Get, Logger, Query } from '@nestjs/common';
import { PokemonTypeFilterPaginatedDto } from './dto/pokemon-type-filter.dto';
import { PokemonTypeService } from './pokemon-type.service';
import { ApiTags } from '@nestjs/swagger';

export const POKEMON_TYPE_ENDPOINT = 'pokemon-type';
@ApiTags(POKEMON_TYPE_ENDPOINT)
@Controller(POKEMON_TYPE_ENDPOINT)
export class PokemonTypeController {
  private readonly logger: Logger = new Logger(PokemonTypeController.name);

  constructor(private readonly pokemonTypeService: PokemonTypeService) {}

  @Get()
  findAll(@Query() filter: PokemonTypeFilterPaginatedDto) {
    this.logger.verbose(
      `GET: "/${POKEMON_TYPE_ENDPOINT}" - Returning all pokemon types with filter: ${JSON.stringify(filter)}`,
    );
    return this.pokemonTypeService.findAll(filter);
  }
}
