import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Like, Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonFilterDto } from './dto/pokemon-filter.dto';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonTypeRepository: Repository<Pokemon>,
  ) {}

  /**
   * findAll
   * @description Find all Pokemons
   * @param {PokemonTypeFilterDto} filter - The filter to apply
   * @returns An array of Pokemon types
   */
  findAll(filter: PokemonFilterDto) {
    this.logger.verbose(`findAll - filter ${JSON.stringify(filter)}`);
    return this.pokemonTypeRepository.find({
      ...this.getFilterFindManyOptions(filter),
      skip: filter.skip,
      take: filter.take,
      relations: ['nextEvolutions', 'previousEvolutions'],
    });
  }

  /**
   * count
   * @description Count the number of Pokemons
   * @param {PokemonTypeFilterDto} filter - The filter to apply
   * @returns The number of Pokemons
   */
  count(filter: PokemonFilterDto) {
    this.logger.verbose(`count - filter ${JSON.stringify(filter)}`);
    return this.pokemonTypeRepository.count(
      this.getFilterFindManyOptions(filter),
    );
  }

  /**
   * getFilterFindManyOptions
   * @description Get the FindManyOptions for the filter
   * @param {PokemonFilterDto} filter - The filter to apply
   * @returns The FindManyOptions
   */
  private getFilterFindManyOptions(
    filter: PokemonFilterDto,
  ): FindManyOptions<Pokemon> {
    return {
      where: {
        name: filter.name ? Like(`%${filter.name}%`) : undefined,
        types: filter.pokemonTypeIds
          ? {
              pokemonTypeId: In(filter.pokemonTypeIds),
            }
          : undefined,
      },
    };
  }
}
