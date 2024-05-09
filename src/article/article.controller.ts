import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guards/auth/auth.guard';
import { User } from '../user/decorators/user/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Users } from '../user/user.entity';
import { ArticleResponse } from './types/articleResponse.interface';
import { ArticlesResponse } from './types/articlesResponse.interface';
import { BackendValidationPipe } from '../shared/pipes/backendValidation.pipe';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') userId: number,
    @Query() query: any,
  ): Promise<ArticlesResponse> {
    return await this.articleService.findAll(userId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  async getFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponse> {
    return await this.articleService.getFeed(currentUserId, query);
  }

  @Post()
  @UsePipes(BackendValidationPipe)
  @UseGuards(AuthGuard)
  async createArticle(
    @User() user: Users,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.createArticle(
      user,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async GetArticle(@Param('slug') slug: string): Promise<ArticleResponse> {
    const article = await this.articleService.getArticleBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@User('id') userId: number, @Param('slug') slug: string) {
    return await this.articleService.deleteArticle(slug, userId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(BackendValidationPipe)
  async updateArticle(
    @User('id') userId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.updateArticle(
      slug,
      userId,
      updateArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async favoriteArticle(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.favoriteArticle(slug, userId);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async unfavoriteArticle(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponse> {
    const article = await this.articleService.unfavoriteArticle(slug, userId);
    return this.articleService.buildArticleResponse(article);
  }
}
