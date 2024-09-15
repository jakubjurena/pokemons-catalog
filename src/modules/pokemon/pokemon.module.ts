import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attack } from './entities/attack.entity';
import { Class } from './entities/class.entity';
import { Classification } from './entities/classification.entity';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attack, Class, Classification, Pokemon])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
