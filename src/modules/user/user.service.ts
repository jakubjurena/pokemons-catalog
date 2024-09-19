import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getMe(activeUser: ActiveUserData) {
    const user = await this.userRepository.findOne({
      where: {
        email: activeUser.email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${activeUser.email} not found`,
      );
    }

    return user;
  }
}
