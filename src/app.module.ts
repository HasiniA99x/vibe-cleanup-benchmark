import { Module } from '@nestjs/common';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticleRepository } from './articles/article.repository';
import { ArticleFormatter } from './articles/article.formatter';
import { OpenAiClient } from './ai/openai-ai-client';
import { AiClientFactory } from './ai/ai-client.factory';
import { ClientWrapper } from './ai/client-wrapper';
import { UserProfileService } from './users/user-profile.service';
import { UserPreferencesService } from './users/user-preferences.service';
import { EmailSender } from './notifications/email.sender';
import { SmsSender } from './notifications/sms.sender';
import { NotificationService } from './notifications/notification.service';
import { CLOCK } from './common/clock';
import { SystemClock } from './common/system-clock';

@Module({
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    ArticleRepository,
    ArticleFormatter,
    OpenAiClient,
    AiClientFactory,
    ClientWrapper,
    UserProfileService,
    UserPreferencesService,
    EmailSender,
    SmsSender,
    NotificationService,
    { provide: CLOCK, useClass: SystemClock },
  ],
})
export class AppModule {}
