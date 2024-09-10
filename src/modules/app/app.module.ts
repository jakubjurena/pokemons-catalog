import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from '../pokemon/pokemon.module';
import { PokemonTypeModule } from '../pokemon-type/pokemonType.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // DO NOT USE IN PRODUCTION - disable and use migrations
    }),
    PokemonModule,
    PokemonTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
