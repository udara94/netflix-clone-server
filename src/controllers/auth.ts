import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): string {
    return this.userService.getHello();
  }
}
