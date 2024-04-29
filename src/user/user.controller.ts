import { Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser() {
    return this.userService.registerUser();
  }
}
