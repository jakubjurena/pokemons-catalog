import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Attack } from '../../modules/pokemon/entities/attack.entity';
import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';
import { attacksByType } from './investigation/attack';
import { AttackType } from '../../modules/pokemon/enums/attack-type.enum';
import GeneralSeeder from './general.seeder';

export default class AttacksSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(AttacksSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    const attacksRepository = await this.getMainRepository(dataSource, Attack);
    if (attacksRepository === null) {
      return;
    }

    const pokemonTypesRepository = await this.getDependencyRepository(
      dataSource,
      PokemonType,
    );
    if (pokemonTypesRepository === null) {
      this.logger.error('Dependencies not seeded.');
      return;
    }

    const pokemonTypes = await pokemonTypesRepository.find();
    const pokemonTypesByName = pokemonTypes.reduce((acc, type) => {
      acc[type.name] = type;
      return acc;
    }, {});

    const attackTypes = Object.keys(attacksByType).map(async (type) => {
      const attackType = AttackType[type.toLowerCase()];
      const attacks = Object.values(attacksByType[type]);
      this.logger.verbose(`Inserting ${attacks.length} ${type} attacks...`);
      await attacksRepository.insert(
        attacks.map((attack: any) => ({
          name: attack.name,
          attackType,
          damage: attack.damage,
          type: pokemonTypesByName[attack.type],
        })),
      );
    });

    await Promise.all(attackTypes);

    this.logger.log('Successfully inserted.');
  }
}
