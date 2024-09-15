import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PokemonFilterDto } from './dto/pokemon-filter.dto';
import { PokemonService } from './pokemon.service';

export const POKEMON_ENDPOINT = 'pokemon';

@Controller(POKEMON_ENDPOINT)
export class PokemonController {
  private readonly logger: Logger = new Logger(PokemonController.name);
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query() filter: PokemonFilterDto) {
    this.logger.verbose(
      `GET "/${POKEMON_ENDPOINT}" - Returning all pokemons with filter: ${JSON.stringify(filter)}`,
    );
    return this.pokemonService.findAll(filter);
  }

  @Get('count')
  count(@Query() filter: PokemonFilterDto) {
    this.logger.verbose(
      `GET "/${POKEMON_ENDPOINT}/count" - Returning the number of pokemons for filter: ${JSON.stringify(filter)}`,
    );
    return this.pokemonService.count(filter);
  }

  @Get('byName/:name')
  search(@Param('name') name: string) {
    this.logger.verbose(
      `GET "/${POKEMON_ENDPOINT}/byName/:name" - Searching for pokemon by name: ${name}`,
    );
    return this.pokemonService.findByName(name);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    this.logger.verbose(
      `GET "/${POKEMON_ENDPOINT}/:id" - Searching for pokemon by id: ${id}`,
    );
    return this.pokemonService.findById(id);
  }
}
