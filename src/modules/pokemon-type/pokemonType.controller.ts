import { Controller, Get, Logger, Query } from '@nestjs/common';
import { PokemonTypeFilterDto } from './dto/pokemonType.dto';

@Controller('pokemon-type')
export class PokemonTypeController {
  private readonly logger: Logger = new Logger(PokemonTypeController.name);
  @Get()
  findAll(@Query() filter: PokemonTypeFilterDto) {
    this.logger.log(
      `Returning all pokemon types with filter: ${JSON.stringify(filter)}`,
    );
    return ['Grass', 'Fire', 'Water'];
  }
}
