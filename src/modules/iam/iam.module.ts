import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthenticationService } from './authentication/services/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';

import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})

/**
 * IamModule
 * @description A module that contains all the authentication features.
 */
export class IamModule {}
