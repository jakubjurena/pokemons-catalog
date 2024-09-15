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

@Controller('pokemon')
export class PokemonController {
  private readonly logger: Logger = new Logger(PokemonController.name);
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query() filter: PokemonFilterDto) {
    this.logger.log(
      `Returning all pokemons with filter: ${JSON.stringify(filter)}`,
    );
    return this.pokemonService.findAll(filter);
  }

  @Get('count')
  count(@Query() filter: PokemonFilterDto) {
    this.logger.log(
      `Returning the number of pokemons for filter: ${JSON.stringify(filter)}`,
    );
    return this.pokemonService.count(filter);
  }

  @Get('byName/:name')
  search(@Param('name') name: string) {
    return name;
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return `[${id}] Bulbasaur`;
  }
}
