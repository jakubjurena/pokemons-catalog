import { Controller, Get } from '@nestjs/common';
import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { UserService } from './user.service';

@Controller('user')
@Auth(AuthType.Bearer)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  public async me(@ActiveUser() activeUser: ActiveUserData) {
    return this.userService.getMe(activeUser);
  }
}
