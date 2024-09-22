import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { getAccessTokenMock } from '../src/modules/iam/authentication/mock';
import { Pokemon } from 'src/modules/pokemon/entities/pokemon.entity';

describe('PokemonController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('PokemonService', () => {
    beforeEach(async () => {});

    it('should be defined', () => {});

    describe('findAll', () => {
      it.todo('find all tests');
    });

    describe('count', () => {
      it.todo('count tests');
    });

    describe('findByName', () => {
      it.todo('findByName tests');
    });

    describe('findById', () => {
      it.todo('find by id tests');
    });

    describe('setPokemonFavorite', () => {
      const existingPokemonId = 1;
      const nonExistingPokemonId = 999;
      const existingUserEmail = 'jakub.jurena@gmail.com';
      const nonExistingUserEmail = 'test@test.test';
      const bearerToken = `Bearer ${getAccessTokenMock(existingUserEmail)}`;
      const unvalidBearerToken = `Bearer ${getAccessTokenMock(nonExistingUserEmail)}`;

      beforeAll(async () => {
        await request(app.getHttpServer())
          .patch(`/pokemon/${existingPokemonId}/favorite`)
          .send({ isFavorite: false })
          .set('Authorization', bearerToken);
      });

      it('should throw UnauthorizedException if no Bearer provided', async () => {
        await request(app.getHttpServer())
          .patch(`/pokemon/${existingPokemonId}/favorite`)
          .expect(401);
      });
      it('should set a pokemon as favorite', async () => {
        const favoritePokemons = await request(app.getHttpServer())
          .patch(`/pokemon/${existingPokemonId}/favorite`)
          .send({ isFavorite: true })
          .set('Authorization', bearerToken)
          .expect(200);
        expect(
          (favoritePokemons.body as Pokemon[]).map(
            (pokemon) => pokemon.pokemonId,
          ),
        ).toContain(existingPokemonId);
      });
      it('should unset a pokemon as favorite', async () => {
        const favoritePokemons = await request(app.getHttpServer())
          .patch(`/pokemon/${existingPokemonId}/favorite`)
          .send({ isFavorite: false })
          .set('Authorization', bearerToken)
          .expect(200);
        expect(
          (favoritePokemons.body as Pokemon[]).map(
            (pokemon) => pokemon.pokemonId,
          ),
        ).not.toContain(existingPokemonId);
      });
      it('should throw NotFoundException if user does not exist', async () => {
        await request(app.getHttpServer())
          .patch(`/pokemon/${existingPokemonId}/favorite`)
          .set('Authorization', unvalidBearerToken)
          .expect(404)
          .expect({
            statusCode: 404,
            error: 'Not Found',
            message: `User with email "${nonExistingUserEmail}" not found`,
          });
      });
      it('should throw NotFoundException if pokemon does not exist', async () => {
        await request(app.getHttpServer())
          .patch(`/pokemon/${nonExistingPokemonId}/favorite`)
          .set('Authorization', bearerToken)
          .expect(404)
          .expect({
            statusCode: 404,
            error: 'Not Found',
            message: `Pokemon with id "${nonExistingPokemonId}" not found`,
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
