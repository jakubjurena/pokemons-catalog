import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypeService } from './pokemon-type.service';

describe('PokemonTypeService', () => {
  let service: PokemonTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonTypeService],
    }).compile();

    service = module.get<PokemonTypeService>(PokemonTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
  });
});
