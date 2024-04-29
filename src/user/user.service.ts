import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';

@Injectable()
export class UserService {
  async registerUser(registerUserDto: RegisterUserDto) {
    return registerUserDto;
  }
}
