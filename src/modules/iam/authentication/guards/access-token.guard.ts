import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../iam.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { getActiveUserDataMock } from '../mock';

/**
 * AccessTokenGuard
 * @description A guard that is used to check if the user has a valid access token.
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {
  private readonly logger = new Logger(AccessTokenGuard.name);

  constructor() {}

  /**
   * canActivate
   * @description A method that is used to check if the user has a valid access token.
   * @param context The execution context
   * @returns true if the user has a valid access token
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(`Token not found for ${request.url}`);
    }
    try {
      const payload: ActiveUserData = getActiveUserDataMock(token); // TODO: for full solution use JWT (read body of signed JWT)
      request[REQUEST_USER_KEY] = payload;
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException(`Token not valid for '${request.url}'`);
    }
    return true;
  }

  /**
   * extractTokenFromHeader
   * @description A method that is used to extract the bearer token from the request header.
   * @param request The request
   * @returns The bearer token from the request header
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, key] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? key : undefined;
  }
}
