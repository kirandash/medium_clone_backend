import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async registerUser() {
    return 'Registered User';
  }
}
