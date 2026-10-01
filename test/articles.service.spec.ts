import { ArticlesService } from '../src/articles/articles.service';
import { ArticleFormatter } from '../src/articles/article.formatter';
import { ArticleRepository } from '../src/articles/article.repository';
import { Clock } from '../src/common/clock';

class FixedClock implements Clock {
  now(): Date {
    return new Date('2026-02-03T04:05:06.000Z');
  }
}

describe('ArticlesService', () => {
  it('uses the clock boundary for deterministic createdAt values', async () => {
    const repository = new ArticleRepository();
    const service = new ArticlesService(
      { summarize: async () => 'summary' } as any,
      repository,
      {
        getByUserId: async (id: string) => ({
          id,
          displayName: 'Test User',
          email: 'test@example.test',
        }),
      } as any,
      {
        getForUser: async () => ({
          topics: ['engineering'],
          emailNotifications: false,
        }),
      } as any,
      new ArticleFormatter(),
      { notify: async () => undefined } as any,
      new FixedClock(),
    );

    const result = await service.generate(
      {
        title: 'Test article',
        content: 'This content is long enough for the DTO contract.',
      },
      'auth-user',
    );

    expect(result.createdAt).toBe('2026-02-03T04:05:06.000Z');
  });
});
