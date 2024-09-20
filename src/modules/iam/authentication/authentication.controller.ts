import {
  Body,
  Controller,
  HttpCode,
  Logger,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import {
  ApiNotImplementedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthenticationService } from './services/authentication.service';

import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInResponse } from '../iam.types';

const AUTHENTICATION_ENDPOINT = 'authentication';

/**
 * AuthenticationController
 * @description A controller that handles the authentication routes.
 */
@ApiTags(AUTHENTICATION_ENDPOINT)
@Controller(AUTHENTICATION_ENDPOINT)
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
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    this.logger.verbose(
      `POST '/${AUTHENTICATION_ENDPOINT}/sign-in' - Signing in the user: ${JSON.stringify(signInDto)}`,
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
  @ApiNotImplementedResponse({ description: 'Not implemented' })
  @HttpCode(501)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    this.logger.verbose(
      `POST '/${AUTHENTICATION_ENDPOINT}/refresh-token' - Refreshing the user's token: ${JSON.stringify(refreshTokenDto)}`,
    );
    // return this.authService.refreshToken(refreshTokenDto);
    throw new NotImplementedException('Not implemented');
  }
}
