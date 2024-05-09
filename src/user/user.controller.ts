import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';
import { UserResponse } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '@app/user/decorators/user/user.decorator';
import { AuthGuard } from '@app/user/guards/auth/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Users } from './user.entity';
import { BackendValidationPipe } from '../shared/pipes/backendValidation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  // validate the incoming request body or DTO using the ValidationPipe
  @UsePipes(BackendValidationPipe)
  async registerUser(
    @Body('user') registerUserDto: RegisterUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.registerUser(registerUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(BackendValidationPipe)
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: Users): Promise<UserResponse> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
