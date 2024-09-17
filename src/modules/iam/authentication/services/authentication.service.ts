import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SignInResponse } from '../../iam.types';
import { getAccessTokenMock } from '../mock';

/**
 * AuthenticationService
 * @description A service that is used to handle the authentication logic.
 */
@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor() {}

  /**
   * @description A method that signs in a user
   * @param {SignInDto} signInDto - The sign in data transfer object
   * @returns The user email and access token
   */
  public async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    return {
      email: signInDto.email,
      accessToken: getAccessTokenMock(signInDto.email), // TODO: for full solution use JWT (jwtService from '@nestjs/jwt')
      // refreshToken: `refresh_token_${signInDto.email}`, // TODO: for full solution (sign randomUUID, send to user and save in DB - possibility to unvalidate it on logout, ...)
    };
  }

  /**
   * @description A method that refreshes a user's token
   * @returns The user email and access token
   */
  public async refreshToken(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refreshTokenDto: RefreshTokenDto,
  ): Promise<SignInResponse> {
    // TODO: check if refreshToken is valid (expiration and DB validity), generate new accessToken and refreshToken
    throw new NotImplementedException('Not implemented');
  }
}
