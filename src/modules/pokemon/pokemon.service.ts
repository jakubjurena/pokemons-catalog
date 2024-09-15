import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Like, Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonFilterDto } from './dto/pokemon-filter.dto';

const POKEMON_RELATIONS: FindOneOptions<Pokemon>['relations'] = [
  'nextEvolutions',
  'previousEvolutions',
];

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
  public async findAll(filter: PokemonFilterDto) {
    this.logger.verbose(`findAll - filter ${JSON.stringify(filter)}`);
    return this.pokemonTypeRepository.find({
      ...this.getFilterFindManyOptions(filter),
      skip: filter.skip,
      take: filter.take,
      relations: POKEMON_RELATIONS,
    });
  }

  /**
   * count
   * @description Count the number of Pokemons
   * @param {PokemonTypeFilterDto} filter - The filter to apply
   * @returns The number of Pokemons
   */
  public async count(filter: PokemonFilterDto) {
    this.logger.verbose(`count - filter ${JSON.stringify(filter)}`);
    return this.pokemonTypeRepository.count(
      this.getFilterFindManyOptions(filter),
    );
  }

  /**
   * findByName
   * @description Find a Pokemon by its name (primary key)
   * @param {string} pokemonName - The Name of the Pokemon
   * @returns The Pokemon
   */
  public async findByName(pokemonName: string) {
    const pokemon = await this.pokemonTypeRepository.findOne({
      where: { name: pokemonName },
      relations: POKEMON_RELATIONS,
    });

    if (pokemon === undefined) {
      throw new NotFoundException(
        `Pokemon with name "${pokemonName}" not found`,
      );
    }

    return pokemon;
  }

  /**
   * findById
   * @description Find a Pokemon by its id (primary key)
   * @param {number} pokemonId - The Id of the Pokemon
   * @returns The Pokemon
   */
  public async findById(pokemonId: number) {
    const pokemon = await this.pokemonTypeRepository.findOne({
      where: { pokemonId },
      relations: POKEMON_RELATIONS,
    });

    if (pokemon === undefined) {
      throw new NotFoundException(`Pokemon with id "${pokemonId}" not found`);
    }

    return pokemon;
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
