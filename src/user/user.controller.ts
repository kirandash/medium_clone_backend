import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';
import { UserResponse } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // validate the incoming request body or DTO using the ValidationPipe
  @UsePipes(ValidationPipe)
  async registerUser(
    @Body('user') registerUserDto: RegisterUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.registerUser(registerUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
}
