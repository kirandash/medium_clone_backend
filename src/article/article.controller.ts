import { Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  async createArticle() {
    return this.articleService.createArticle();
  }
}
