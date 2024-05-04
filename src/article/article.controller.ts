import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guards/auth/auth.guard';
import { User } from '../user/decorators/user/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Users } from '../user/user.entity';
import { ArticleResponse } from './types/articleResponse.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UsePipes(ValidationPipe)
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
}
