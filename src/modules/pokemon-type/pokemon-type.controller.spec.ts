import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypeController } from './pokemon-type.controller';
import { PokemonTypeService } from './pokemon-type.service';

describe('PokemonTypeController', () => {
  let controller: PokemonTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonTypeController],
      providers: [
        {
          provide: PokemonTypeService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PokemonTypeController>(PokemonTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
