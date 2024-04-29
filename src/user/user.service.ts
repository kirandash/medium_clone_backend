import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '@app/user/dto/registerUser.dto';
import { Users } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponse } from '@app/user/types/userResponse.interface';

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

  generateJwtToken(user: Users): string {
    return sign(
      // the payload of the JWT token that the client will receive
      {
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.image,
      },
      // TODO: Debug why process.env.JWT_SECRET is not working
      // process.env.JWT_SECRET,
      'kiranstopsecret',
    );
  }

  buildUserResponse(user: Users): UserResponse {
    return { user: { ...user, token: this.generateJwtToken(user) } };
  }
}
