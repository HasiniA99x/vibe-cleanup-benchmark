import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { GenerateArticleDto } from './dto/generate-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('generate')
  generate(
    @Body() dto: GenerateArticleDto,
    @Headers('x-user-id') authenticatedUserId?: string,
  ) {
    if (!dto.title || dto.title.length < 3) {
      throw new BadRequestException('Title must be at least 3 characters');
    }

    if (!authenticatedUserId) {
      throw new UnauthorizedException('Missing authenticated user');
    }

    return this.articlesService.generate(dto, authenticatedUserId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.articlesService.getById(id);
  }
}
