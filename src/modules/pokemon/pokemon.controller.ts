import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PokemonFilterDto } from './dto/pokemon-filter.dto';

@Controller('pokemon')
export class PokemonController {
  private readonly logger: Logger = new Logger(PokemonController.name);
  constructor() {}

  @Get()
  findAll(@Query() filter: PokemonFilterDto) {
    this.logger.log(
      `Returning all pokemons with filter: ${JSON.stringify(filter)}`,
    );
    return ['Bulbasaur', 'Charmander', 'Squirtle'];
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
