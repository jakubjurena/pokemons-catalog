import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypeService } from './pokemon-type.service';
import { PokemonType } from './entities/pokemon-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockRepository } from '../../../test/utils';

describe('PokemonTypeService', () => {
  let service: PokemonTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonTypeService,
        {
          provide: getRepositoryToken(PokemonType),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<PokemonTypeService>(PokemonTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
