import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonTypeModule } from './pokemon-type/pokemon-type.module';
import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    IamModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    PokemonModule,
    PokemonTypeModule,
    UserModule,
  ],
})
export class AppModule {}
