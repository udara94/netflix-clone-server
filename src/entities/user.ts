import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile: string;
}

export class UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.mobile = user.mobile;
  }

  static fromEntity(user: User): UserResponse {
    return new UserResponse(user);
  }
}

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;

  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  password: string;

  mobile: string;

  static toEntity(dto: CreateUserDTO): User {
    const user = new User();
    user.first_name = dto.firstName;
    user.last_name = dto.lastName;
    user.email = dto.email;
    user.password = dto.password;
    user.mobile = dto.mobile;
    return user;
  }
}
