import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';
import { UserResponse } from '@app/user/types/userResponse.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(
    @Body('user') registerUserDto: RegisterUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.registerUser(registerUserDto);
    return this.userService.buildUserResponse(user);
  }
}
