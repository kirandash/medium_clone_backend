import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';
import { Users } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<Users> {
    // create a new user instance and assign the values from the registerUserDto
    const newUser = new Users();
    Object.assign(newUser, registerUserDto);
    // save the new user instance to the database
    return await this.userRepository.save(newUser);
  }
}
