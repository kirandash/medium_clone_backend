import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Body('user') registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.userService.registerUser(registerUserDto);
  }
}
