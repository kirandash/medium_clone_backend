import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';
import { Users } from '@app/user/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(
    @Body('user') registerUserDto: RegisterUserDto,
  ): Promise<Users> {
    return this.userService.registerUser(registerUserDto);
  }
}
