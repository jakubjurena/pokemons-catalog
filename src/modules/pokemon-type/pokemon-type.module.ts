import { Module } from '@nestjs/common';
import { PokemonTypeController } from './pokemon-type.controller';
import { PokemonTypeService } from './pokemon-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonType } from './entities/pokemon-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonType])],
  controllers: [PokemonTypeController],
  providers: [PokemonTypeService],
})
export class PokemonTypeModule {}
