import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Like, Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import {
  PokemonFilterDto,
  PokemonFilterPaginatedDto,
} from './dto/pokemon-filter.dto';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { User } from '../user/entities/user.entity';
import { PatchPokemonFavoriteDto } from './dto/patch-pokemon-favorite.dto';

const POKEMON_RELATIONS: FindOneOptions<Pokemon>['relations'] = [
  'class',
  'classification',
  'nextEvolutions',
  'previousEvolutions',
  'types',
  'resistant',
  'weaknesses',
  'attacks',
  'classification',
];

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * findAll
   * @description Find all Pokemons
   * @param {PokemonFilterPaginatedDto} filter - The filte with pag to apply
   * @returns An array of Pokemon types
   */
  public async findAll(filter: PokemonFilterPaginatedDto) {
    this.logger.verbose(`findAll - filter ${JSON.stringify(filter)}`);
    return this.pokemonRepository.find({
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
    return this.pokemonRepository.count(this.getFilterFindManyOptions(filter));
  }

  /**
   * findByName
   * @description Find a Pokemon by its name (primary key)
   * @param {string} pokemonName - The Name of the Pokemon
   * @returns The Pokemon
   */
  public async findByName(pokemonName: string) {
    const pokemon = await this.pokemonRepository.findOne({
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
    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId },
      relations: POKEMON_RELATIONS,
    });

    if (pokemon === undefined) {
      throw new NotFoundException(`Pokemon with id "${pokemonId}" not found`);
    }

    return pokemon;
  }

  public async togglePokemonFavorite(
    userData: ActiveUserData,
    pokemonId: number,
    patchPokemonFavoriteDto: PatchPokemonFavoriteDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
      relations: ['favoritePokemons'],
    });

    if (user === undefined) {
      throw new NotFoundException(
        `User with email "${userData.email}" not found`,
      );
    }

    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId },
    });

    if (pokemon === undefined) {
      throw new NotFoundException(`Pokemon with id "${pokemonId}" not found`);
    }

    if (!patchPokemonFavoriteDto.isFavorite) {
      // Remove the Pokemon from the list
      user.favoritePokemons = user.favoritePokemons.filter(
        (p) => p.pokemonId !== pokemonId,
      );
    } else if (!user.favoritePokemons.some((p) => p.pokemonId === pokemonId)) {
      // Add the Pokemon to the list
      user.favoritePokemons.push(pokemon);
    } else {
      // Pokemon is already in the list
      return user.favoritePokemons;
    }

    await this.userRepository.save(user);
    return user.favoritePokemons;
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
