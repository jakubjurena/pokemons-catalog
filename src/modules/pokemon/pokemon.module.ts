import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, User])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
