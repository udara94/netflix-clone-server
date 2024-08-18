import { Injectable } from '@nestjs/common';
import { CreateUserDTO, User, UserResponse } from 'src/entities/user';
import { UserRepository } from 'src/repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDto: CreateUserDTO): Promise<UserResponse> {
    const user = CreateUserDTO.toEntity(userDto);
    const result = await this.userRepository.createUser(user);
    return UserResponse.fromEntity(result);
  }

  async getUserByEmail(email: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      return null;
    }
    return UserResponse.fromEntity(user);
  }

  async getUserForLogin(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });
    return user;
  }
}
