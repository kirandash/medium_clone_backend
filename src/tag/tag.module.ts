import { Module } from '@nestjs/common';
import { TagController } from '@app/tag/tag.controller';
import { TagService } from '@app/tag/tag.service';
import { Tag } from '@app/tag/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // forFeature() method is sued to define which repositories are registered in the current scope.
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
