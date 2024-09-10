import { Module } from '@nestjs/common';
import { PokemonTypeController } from './pokemonType.controller';

@Module({
  controllers: [PokemonTypeController],
})
export class PokemonTypeModule {}
