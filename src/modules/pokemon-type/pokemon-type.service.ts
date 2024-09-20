import { Injectable, Logger } from '@nestjs/common';
import { PokemonTypeFilterPaginatedDto } from './dto/pokemon-type-filter.dto';
import { PokemonType } from './entities/pokemon-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonTypeService {
  private readonly logger = new Logger(PokemonTypeService.name);

  constructor(
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
  ) {}

  /**
   * findAll
   * @description Find all Pokemon types
   * @param {PokemonTypeFilterPaginatedDto} filter - The filter to apply
   * @returns An array of Pokemon types
   */
  findAll(filter: PokemonTypeFilterPaginatedDto) {
    this.logger.verbose(`findAll - filter ${JSON.stringify(filter)}`);
    return this.pokemonTypeRepository.find({
      skip: filter.skip,
      take: filter.take,
    });
  }
}
