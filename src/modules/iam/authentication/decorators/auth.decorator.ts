import { SetMetadata } from '@nestjs/common';

import { AuthType } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../../iam.constants';

/**
 * Auth
 * @description A custom decorator that is used to set the authentication types required to access the route.
 * @param authTypes The authentication types required to access the route
 * @example @Auth(AuthType.None)
 */
export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
