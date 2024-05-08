import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
