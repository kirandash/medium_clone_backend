import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Users } from '../user/user.entity';
import { ArticleResponse } from '@app/article/types/articleResponse.interface';
import slugify from 'slugify';
import { ArticlesResponse } from './types/articlesResponse.interface';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private dataSource: DataSource,
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

  async deleteArticle(slug: string, userId: number): Promise<DeleteResult> {
    // fetch article to check if the user is the author and article exists
    const article = await this.getArticleBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== userId) {
      throw new HttpException('You are not the author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  async favoriteArticle(slug: string, userId: number): Promise<ArticleEntity> {
    const article = await this.getArticleBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const isNotFavorited = user.favorites.every(
      (favorite) => favorite.id !== article.id,
    );

    if (isNotFavorited) {
      user.favorites.push(article);
      article.favoritesCount++;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }

  async findAll(userId: number, query: any): Promise<ArticlesResponse> {
    // create query builder using repository
    const queryBuilder = this.dataSource
      .getRepository(ArticleEntity)
      // alias for building queries
      .createQueryBuilder('article')
      // Note: eager: true does not work with queryBuilder hence we use leftJoinAndSelect
      .leftJoinAndSelect('article.author', 'author');

    // Filter By Tag
    if (query.tag) {
      // LIKE is used to search for a sub string in the tagList
      // Note that the tagList is stored as a simple array in the database which is a comma separated string
      queryBuilder.andWhere('article.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    // Filter By Author
    if (query.author) {
      const author = await this.userRepository.findOne({
        where: { username: query.author },
      });
      queryBuilder.andWhere('article.authorId = :id', {
        id: author.id,
      });
    }

    // sort by createdAt
    queryBuilder.orderBy('article.createdAt', 'DESC');

    // Count articles before applying limit and offset
    const articlesCount = await queryBuilder.getCount();

    // Query filters

    // Limit number of articles
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    // Offset/skip number of articles
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const articles = await queryBuilder.getMany();

    return { articles, articlesCount };
  }

  private generateSlug(title: string): string {
    const uniqueId = Math.random().toString(36).substring(2);
    return slugify(title, { lower: true }) + '-' + uniqueId;
  }

  async getArticleBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ where: { slug } });
  }

  async updateArticle(
    slug: string,
    userId: number,
    updateArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.getArticleBySlug(slug);

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== userId) {
      throw new HttpException('You are not the author', HttpStatus.FORBIDDEN);
    }

    // update slug if title is changed
    if (updateArticleDto.title && article.title !== updateArticleDto.title) {
      article.slug = this.generateSlug(updateArticleDto.title);
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }
}
