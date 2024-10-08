import { PickType } from '@nestjs/swagger';
import { User } from './entities/user.entity';

export class UserMeResponse extends PickType(User, ['userId', 'email']) {}
