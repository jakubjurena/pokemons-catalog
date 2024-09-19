import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import GeneralSeeder from './general.seeder';
import { User } from '../../modules/user/entities/user.entity';
import { Pokemon } from '../../modules/pokemon/entities/pokemon.entity';

const mockUsers = ['jakub.jurena@gmail.com'];
const mockFavoritePokemon = 'Pikachu';

export default class UsersSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(UsersSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    dataSource.manager.transaction(async (manager) => {
      const repository = await this.getMainRepository(manager, User);
      if (repository === null) {
        return;
      }
      const pokemonRepository = await this.getDependencyRepository(
        manager,
        Pokemon,
      );

      this.logger.verbose(`Inserting ${mockUsers.length} users...`);

      await repository.insert(mockUsers.map((email) => ({ email })));

      const users = await repository.find();
      const pokemon = await pokemonRepository.findOne({
        where: { name: mockFavoritePokemon },
      });

      if (!pokemon) {
        this.logger.error(`Pokemon "${mockFavoritePokemon}" not found.`);
        throw new Error(`Pokemon "${mockFavoritePokemon}" not found.`);
      }
      await repository.save(
        users.map((user) => ({ ...user, favoritePokemons: [pokemon] })),
      );

      this.logger.log('Successfully inserted.');
    });
  }
}
