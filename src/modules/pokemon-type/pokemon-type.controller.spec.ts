import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypeController } from './pokemon-type.controller';

describe('PokemonTypeController', () => {
  let controller: PokemonTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonTypeController],
    }).compile();

    controller = module.get<PokemonTypeController>(PokemonTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
