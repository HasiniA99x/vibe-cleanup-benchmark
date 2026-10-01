import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ClientWrapper } from '../ai/client-wrapper';
import { CLOCK, Clock } from '../common/clock';
import { NotificationService } from '../notifications/notification.service';
import { UserPreferencesService } from '../users/user-preferences.service';
import { UserProfileService } from '../users/user-profile.service';
import { ArticleFormatter, FormattedArticle } from './article.formatter';
import { Article } from './article.model';
import { ArticleRepository } from './article.repository';
import { GenerateArticleDto } from './dto/generate-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly client: ClientWrapper,
    private readonly repository: ArticleRepository,
    private readonly profileService: UserProfileService,
    private readonly preferencesService: UserPreferencesService,
    private readonly formatter: ArticleFormatter,
    private readonly notifications: NotificationService,
    @Inject(CLOCK) private readonly clock: Clock,
  ) {}

  async generate(
    dto: GenerateArticleDto,
    authenticatedUserId: string,
  ): Promise<FormattedArticle> {
    if (!dto.title || dto.title.length < 3) {
      throw new BadRequestException('Title must be at least 3 characters');
    }

    const ownerId = dto.userId || authenticatedUserId;

    const profile = await this.profileService.getByUserId(ownerId);
    const preferences = await this.preferencesService.getForUser(ownerId);
    const summary = await this.client.summarize(dto.content);

    const article: Article = {
      id: randomUUID(),
      title: dto.title,
      content: dto.content,
      summary,
      ownerId,
      topics: preferences.topics,
      createdAt: this.clock.now(),
    };

    await this.repository.save(article);

    if (preferences.emailNotifications) {
      await this.notifications.notify(profile.email, article.title);
    }

    return this.formatter.format(article);
  }

  async getById(id: string): Promise<FormattedArticle> {
    const article = await this.repository.findById(id);
    if (!article) {
      throw new NotFoundException(`Article ${id} was not found`);
    }

    const freshCopy = await this.repository.findById(id);
    return this.formatter.format(freshCopy!);
  }
}
