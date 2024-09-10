import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from '../pokemon/pokemon.module';
import { PokemonTypeModule } from '../pokemon-type/pokemon-type.module';
import { dataSourceOptions } from 'src/db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    PokemonModule,
    PokemonTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
