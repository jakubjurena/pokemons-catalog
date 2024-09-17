import {
  Body,
  Controller,
  Logger,
  NotImplementedException,
  Post,
} from '@nestjs/common';

import { AuthenticationService } from './services/authentication.service';

import { SignInDto } from './dto/sign-in.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

/**
 * AuthenticationController
 * @description A controller that handles the authentication routes.
 */
@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(private readonly authService: AuthenticationService) {}

  /**
   * signIn
   * @description A route that is used to sign in the user.
   * @param signInDto The sign in user data
   * @returns The user access and refresh tokens
   */
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    this.logger.verbose(
      `POST '/authentication/sign-in' - Signing in the user: ${JSON.stringify(signInDto)}`,
    );
    return this.authService.signIn(signInDto);
  }

  /**
   * refreshToken
   * @description A route that is used to refresh the user's token.
   * @param refreshTokenDto The refresh token data
   * @returns The user access and refresh tokens
   */
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    this.logger.verbose(
      `POST '/authentication/refresh-token' - Refreshing the user's token: ${JSON.stringify(refreshTokenDto)}`,
    );
    // return this.authService.refreshToken(refreshTokenDto);
    throw new NotImplementedException('Not implemented');
  }
}
