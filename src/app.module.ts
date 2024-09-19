import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IamModule } from './modules/iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { PokemonTypeModule } from './modules/pokemon-type/pokemon-type.module';
import { dataSourceOptions } from 'src/db/data-source';
import { UserModule } from './modules/user/user.module';

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
