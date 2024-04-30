import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';
import { UserResponse } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '@app/user/decorators/user/user.decorator';
import { AuthGuard } from '@app/user/guards/auth/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  // validate the incoming request body or DTO using the ValidationPipe
  @UsePipes(ValidationPipe)
  async registerUser(
    @Body('user') registerUserDto: RegisterUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.registerUser(registerUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(ValidationPipe)
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: any): Promise<UserResponse> {
    return this.userService.buildUserResponse(user);
  }
}
