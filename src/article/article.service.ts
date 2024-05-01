import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  createArticle() {
    return 'This action adds a new article';
  }
}
