import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { AUTH_TYPE_KEY } from '../iam/iam.constants';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';

describe('PokemonController', () => {
  let controller: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [{ provide: PokemonService, useValue: {} }],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it.todo('should return all pokemons');
  });
  describe('search (byName endpoint)', () => {
    it.todo('should return pokemon by name');
    it.todo('should throw not found exception');
  });
  describe('findOneById', () => {
    it.todo('should return pokemon by id');
    it.todo('should throw not found exception');
  });
  describe('setPokemonFavorite', () => {
    it.todo('should return new favorite pokemons');
    it.todo('should throw not found exception if user not found');
    it.todo('should throw not found exception id pokemon not found');

    it('Should have Bearer token auth guard', () => {
      const authTypes = Reflect.getMetadata(
        AUTH_TYPE_KEY,
        controller.setPokemonFavorite,
      );
      expect(authTypes).toContain(AuthType.Bearer);
      expect(authTypes).toHaveLength(1);
    });
  });
});
