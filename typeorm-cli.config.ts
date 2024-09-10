import { Attack } from 'src/modules/pokemon/entities/attack.entity';
import { Candy } from 'src/modules/pokemon/entities/candy.entity';
import { Class } from 'src/modules/pokemon/entities/class.entity';
import { Classification } from 'src/modules/pokemon/entities/classification.entity';
import { Pokemon } from 'src/modules/pokemon/entities/pokemon.entity';
import { PokemonType } from 'src/modules/pokemon-type/entities/pokemonType.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pokemon_password',
  database: 'pokemon_db',
  synchronize: true,
  entities: [Attack, Candy, Class, Classification, Pokemon, PokemonType],
  migrations: [],
});
