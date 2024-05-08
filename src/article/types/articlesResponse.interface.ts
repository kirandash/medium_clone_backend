import { ArticleType } from './article.type';

export interface ArticlesResponse {
  articles: ArticleType[];
  articlesCount: number;
}
