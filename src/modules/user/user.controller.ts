import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { UserService } from './user.service';
import { UserMeResponse } from './user.types';

const USER_ENDPOINT = 'user';

@ApiTags(USER_ENDPOINT)
@Controller(USER_ENDPOINT)
@ApiBearerAuth()
@Auth(AuthType.Bearer)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized - token not found or invalid',
  })
  @ApiNotFoundResponse({
    description: 'User not found - access token for deleted user',
  })
  @Get('me')
  public async me(
    @ActiveUser() activeUser: ActiveUserData,
  ): Promise<UserMeResponse> {
    return this.userService.getMe(activeUser);
  }
}
