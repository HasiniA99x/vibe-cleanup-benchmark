import { Injectable } from '@nestjs/common';
import { Article } from './article.model';

@Injectable()
export class ArticleRepository {
  private readonly articles = new Map<string, Article>();

  async save(article: Article): Promise<void> {
    this.articles.set(article.id, article);
  }

  async findById(id: string): Promise<Article | undefined> {
    await Promise.resolve();
    return this.articles.get(id);
  }
}
