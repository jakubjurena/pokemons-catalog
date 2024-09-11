import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attack } from './entities/attack.entity';
import { Candy } from './entities/candy.entity';
import { Class } from './entities/class.entity';
import { Classification } from './entities/classification.entity';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attack, Candy, Class, Classification, Pokemon]),
  ],
  controllers: [PokemonController],
})
export class PokemonModule {}
