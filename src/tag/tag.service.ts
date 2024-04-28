import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '@app/tag/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    //  inject the tagRepository into the TagService using the @InjectRepository() decorator
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    // hardcoded for now, will be replaced with actual data from database later
    return this.tagRepository.find();
  }
}
