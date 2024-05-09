import { Module } from '@nestjs/common';
import { ArticleController } from '@app/article/article.controller';
import { ArticleService } from '@app/article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Users } from '../user/user.entity';
import { FollowEntity } from '../profile/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, Users, FollowEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
