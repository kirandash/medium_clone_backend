import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../user/decorators/user/user.decorator';
import { ProfileResponseInterface } from './types/profileResponse.interface';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') userId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(
      userId,
      profileUsername,
    );
    return this.profileService.buildProfileResponse(profile);
  }
}
