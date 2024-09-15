import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { createMockRepository } from '../../../test/utils';

describe('PokemonService', () => {
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe('findAll', () => {
    describe('pagination', () => {
      describe('skip', () => {
        it.todo('skip default');
        it.todo('skip = "0"');
        it.todo('skip = "1"');
        it.todo('skip = "-1" should be bad request');
        it.todo('skip = "test" should be bad request');
        it.todo('skip = "1.2" should bad request');
        it.todo('skip = "true" should bad request');
      });
      describe('take', () => {
        it.todo('take default');
        it.todo('take = "0"');
        it.todo('take = "1"');
        it.todo('take = "5"');
        it.todo('take = "-1" should be bad request');
        it.todo('take = "test" should be bad request');
        it.todo('take = "1.2" should bad request');
        it.todo('take = "true" should bad request');
      });
    });
    describe('filter', () => {
      it.todo('no filter');

      describe('filter - name', () => {
        it.todo('non existing name');
        describe('case sensitivity', () => {
          it.todo('existing name - original casing');
          it.todo('existing name - UPPER CASE');
          it.todo('existing name - lower case');
        });
        it.todo('"saur" should return multiple results');
      });

      describe('filter - pokemonTypeIds', () => {
        it.todo('empty array - []');
        it.todo('non existing pokemonTypeId - [123]');
        it.todo('non existing pokemonTypeIds - [123, 456]');
        it.todo('existing pokemonTypeId - [2]');
        it.todo('existing pokemonTypeIds - [2, 3]');
      });
    });
  });

  describe('count', () => {
    describe('filter', () => {
      it.todo('no filter');

      describe('filter - name', () => {
        it.todo('non existing name');
        describe('case sensitivity', () => {
          it.todo('existing name - original casing');
          it.todo('existing name - UPPER CASE');
          it.todo('existing name - lower case');
        });
        it.todo('"saur" should return multiple results');
      });

      describe('filter - pokemonTypeIds', () => {
        it.todo('empty array - []');
        it.todo('non existing pokemonTypeId - [123]');
        it.todo('non existing pokemonTypeIds - [123, 456]');
        it.todo('existing pokemonTypeId - [2]');
        it.todo('existing pokemonTypeIds - [2, 3]');
      });
    });
  });
});
