import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Attack } from '../../modules/pokemon/entities/attack.entity';
import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';
import { attacksByType } from './investigation/attack';
import { AttackType } from '../../modules/pokemon/enums/attack-type.enum';

export default class AttacksSeeder implements Seeder {
  private readonly logger = new Logger(AttacksSeeder.name);

  public async run(dataSource: DataSource): Promise<void> {
    const attacksRepository = dataSource.getRepository(Attack);
    const pokemonTypesRepository = dataSource.getRepository(PokemonType);
    if ((await attacksRepository.count()) > 0) {
      this.logger.log('Already seeded.');
      return;
    }

    if ((await pokemonTypesRepository.count()) === 0) {
      this.logger.error('Pokemon types not seeded.');
      return;
    }

    const pokemonTypes = await pokemonTypesRepository.find();
    const pokemonTypesByName = pokemonTypes.reduce((acc, type) => {
      acc[type.name] = type;
      return acc;
    }, {});
    // this.logger.log(`pokemonTypesByName ${JSON.stringify(pokemonTypesByName)}`);

    this.logger.log('Inserting...');

    const attackTypes = Object.keys(attacksByType).map(async (type) => {
      this.logger.log(`Inserting ${type} attacks...`);
      const attackType = AttackType[type.toLowerCase()];
      this.logger.log(`Attack type ${attackType}`);
      this.logger.log(`Attack types ${JSON.stringify(AttackType)}`);
      const attacks = Object.values(attacksByType[type]);
      this.logger.log(`${type} attacks to insert count ${attacks.length}`);
      await attacksRepository.insert(
        attacks.map((attack: any) => ({
          name: attack.name,
          attackType,
          damage: attack.damage,
          type: pokemonTypesByName[attack.type],
        })),
      );
      // await repository.insert(pokemonTypes.map((name) => ({ name })));
    });

    await Promise.all(attackTypes);

    this.logger.log('Successfully inserted.');
  }
}
