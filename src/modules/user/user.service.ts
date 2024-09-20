import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { User } from './entities/user.entity';
import { UserMeResponse } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Get the user data for the active user
   * @param activeUser The active user data
   * @returns The user data for the active user
   */
  public async getMe(activeUser: ActiveUserData): Promise<UserMeResponse> {
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
