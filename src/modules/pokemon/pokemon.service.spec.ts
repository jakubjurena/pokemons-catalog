import { Test, TestingModule } from '@nestjs/testing';
import { POKEMON_RELATIONS, PokemonService } from './pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { createMockRepository, MockRepository } from '../../../test/utils';
import { NotFoundException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { PatchPokemonFavoriteDto } from './dto/patch-pokemon-favorite.dto';
import {
  PokemonFilterDto,
  PokemonFilterPaginatedDto,
} from './dto/pokemon-filter.dto';
import { In, Like } from 'typeorm';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonRepository: MockRepository<Pokemon>;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    pokemonRepository = module.get(getRepositoryToken(Pokemon));
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
    expect(pokemonRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all pokemons', async () => {
      const expectedPokemons = [];
      const filer: PokemonFilterPaginatedDto = {
        skip: 0,
        take: 10,
      };
      pokemonRepository.find.mockResolvedValue(expectedPokemons);

      const result = await pokemonService.findAll(filer);

      expect(result).toBe(expectedPokemons);

      const { skip, take } = filer;
      expect(pokemonRepository.find).toHaveBeenCalledWith({
        skip,
        take,
        relations: POKEMON_RELATIONS,
      });
    });

    it('should return all pokemons with filter', async () => {
      const expectedPokemons = [];
      const filer: PokemonFilterPaginatedDto = {
        skip: 0,
        take: 10,
        name: 'bulbasaur',
        pokemonTypeIds: [1],
        isFavorite: true,
      };
      pokemonRepository.find.mockResolvedValue(expectedPokemons);

      const result = await pokemonService.findAll(filer);

      expect(result).toBe(expectedPokemons);

      const { skip, take, name, pokemonTypeIds } = filer;
      expect(pokemonRepository.find).toHaveBeenCalledWith({
        skip,
        take,
        relations: POKEMON_RELATIONS,
        where: {
          name: Like(`%${name}%`),
          types: {
            pokemonTypeId: In(pokemonTypeIds),
          },
          // isFavorite: true,
        },
      });
    });
  });

  describe('count', () => {
    it('should return the number of pokemons', async () => {
      const expectedCount = 10;
      const filter = {};
      pokemonRepository.count.mockResolvedValue(expectedCount);

      const result = await pokemonService.count(filter);

      expect(result).toBe(expectedCount);
    });
    it('should return the number of pokemons with filter', async () => {
      const expectedCount = 10;
      const filter: PokemonFilterDto = {
        name: 'bulbasaur',
        pokemonTypeIds: [1],
        isFavorite: true,
      };
      pokemonRepository.count.mockResolvedValue(expectedCount);

      const result = await pokemonService.count(filter);

      expect(result).toBe(expectedCount);

      expect(pokemonRepository.count).toHaveBeenCalledWith({
        where: {
          name: Like(`%${filter.name}%`),
          types: {
            pokemonTypeId: In(filter.pokemonTypeIds),
          },
          // isFavorite: true,
        },
      });
    });
  });

  describe('findByName', () => {
    it('should return a pokemon by name', async () => {
      const pokemonName = 'bulbasaur';
      const expectedPokemon = {};
      pokemonRepository.findOne.mockResolvedValue(expectedPokemon);

      const result = await pokemonService.findByName(pokemonName);

      expect(result).toBe(expectedPokemon);
    });
    it('should throw NotFoundException if pokemonName does not exist', async () => {
      const pokemonName = 'non-existing-pokemon';
      pokemonRepository.findOne.mockResolvedValue(undefined);

      try {
        await pokemonService.findByName(pokemonName);
        expect(false).toBeTruthy(); // should not reach this line
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(
          `Pokemon with name "${pokemonName}" not found`,
        );
      }
    });
  });

  describe('findById', () => {
    it('should return a pokemon by id', async () => {
      const pokemonId = 1;
      const expectedPokemon = {};
      pokemonRepository.findOne.mockResolvedValue(expectedPokemon);

      const result = await pokemonService.findById(pokemonId);

      expect(result).toBe(expectedPokemon);
    });
    it('should throw NotFoundException if id does not exist', async () => {
      const pokemonId = 123;
      pokemonRepository.findOne.mockResolvedValue(undefined);

      try {
        await pokemonService.findById(pokemonId);
        expect(false).toBeTruthy(); // should not reach this line
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Pokemon with id "${pokemonId}" not found`);
      }
    });
  });

  describe('setPokemonFavorite', () => {
    const userData: ActiveUserData = { email: 'test@test.test' };
    const pokemonId = 1;
    const patchPokemonFavoriteDto: PatchPokemonFavoriteDto = {
      isFavorite: true,
    };
    it('should set a pokemon as favorite', async () => {
      const favoritePokemon: Partial<Pokemon> = { pokemonId: 1 };
      const mockFavoritePokemons = [];
      const mockNewFavoritePokemons = [favoritePokemon];
      const expectedUser: Partial<User> = {
        favoritePokemons: mockFavoritePokemons,
      };
      userRepository.findOne.mockResolvedValue(expectedUser);
      pokemonRepository.findOne.mockResolvedValue(favoritePokemon);
      userRepository.save.mockResolvedValue({
        ...favoritePokemon,
        favoritePokemons: [favoritePokemon],
      });

      const result = await pokemonService.setPokemonFavorite(
        userData,
        pokemonId,
        patchPokemonFavoriteDto,
      );

      expect(result).toEqual(mockNewFavoritePokemons);
    });
    it('should throw NotFoundException if user does not exist', async () => {
      userRepository.findOne.mockResolvedValue(undefined);

      try {
        await pokemonService.setPokemonFavorite(
          userData,
          pokemonId,
          patchPokemonFavoriteDto,
        );
        expect(false).toBeTruthy(); // should not reach this line
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(
          `User with email "${userData.email}" not found`,
        );
      }
    });
    it('should throw NotFoundException if pokemon does not exist', async () => {
      const expectedUser = {};
      userRepository.findOne.mockResolvedValue(expectedUser);
      pokemonRepository.findOne.mockResolvedValue(undefined);

      try {
        await pokemonService.setPokemonFavorite(
          userData,
          pokemonId,
          patchPokemonFavoriteDto,
        );
        expect(false).toBeTruthy(); // should not reach this line
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Pokemon with id "${pokemonId}" not found`);
      }
    });
  });

  describe('getFilterFindManyOptions', () => {
    const filterPokemonName = 'bulbasaur';
    const filterPokemonTypeIds = [1, 2];
    it('should return the FindManyOptions for the filter - empty filter', () => {
      const filter: PokemonFilterDto = {};
      const expectedFindManyOptions = {};

      const result = pokemonService.getFilterFindManyOptions(filter);

      expect(result).toEqual(expectedFindManyOptions);
    });
    it('should return the FindManyOptions for the filter - with name', () => {
      const filter: PokemonFilterDto = { name: filterPokemonName };
      const expectedFindManyOptions = {
        where: {
          name: Like(`%${filterPokemonName}%`),
        },
      };

      const result = pokemonService.getFilterFindManyOptions(filter);

      expect(result).toEqual(expectedFindManyOptions);
    });
    it('should return the FindManyOptions for the filter - with pokemonTypeIds', () => {
      const filter: PokemonFilterDto = { pokemonTypeIds: filterPokemonTypeIds };
      const expectedFindManyOptions = {
        where: {
          types: {
            pokemonTypeId: In(filterPokemonTypeIds),
          },
        },
      };
      const result = pokemonService.getFilterFindManyOptions(filter);

      expect(result).toEqual(expectedFindManyOptions);
    });
    it('should return the FindManyOptions for the filter - with name and pokemonTypeIds', () => {
      const filter: PokemonFilterDto = {
        name: filterPokemonName,
        pokemonTypeIds: filterPokemonTypeIds,
      };
      const expectedFindManyOptions = {
        where: {
          name: Like(`%${filterPokemonName}%`),
          types: {
            pokemonTypeId: In(filterPokemonTypeIds),
          },
        },
      };

      const result = pokemonService.getFilterFindManyOptions(filter);

      expect(result).toEqual(expectedFindManyOptions);
    });
  });
});
