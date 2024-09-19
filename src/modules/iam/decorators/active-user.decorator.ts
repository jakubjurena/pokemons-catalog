import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { REQUEST_USER_KEY } from '../iam.constants';

/**
 * ActiveUser
 * @description A parameter decorator that is used to get the active user data from the request.
 * @returns Active user data
 * @example @ActiveUser() user: ActiveUserData
 */
export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    return user;
  },
);
