import { ArticleEntity } from '@app/article/article.entity';

export interface ArticlesResponse {
  articles: ArticleEntity[];
  articlesCount: number;
}
