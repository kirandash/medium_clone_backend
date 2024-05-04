import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user/user.entity';
import { ArticleResponse } from '@app/article/types/articleResponse.interface';
import slugify from 'slugify';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  buildArticleResponse(article: ArticleEntity): ArticleResponse {
    return { article };
  }

  async createArticle(
    user: Users,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);

    article.author = user;

    article.slug = this.generateSlug(article.title);

    // Note: taglist is optional
    if (!article.tagList) {
      article.tagList = [];
    }

    return await this.articleRepository.save(article);
  }

  private generateSlug(title: string): string {
    const uniqueId = Math.random().toString(36).substring(2);
    return slugify(title, { lower: true }) + '-' + uniqueId;
  }
}
