import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    user: Users,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);

    article.author = user;

    // Slug is generated from the title
    article.slug = createArticleDto.title.toLowerCase().replace(/ /g, '-');

    // Note: taglist is optional
    if (!article.tagList) {
      article.tagList = [];
    }

    return await this.articleRepository.save(article);
  }
}
