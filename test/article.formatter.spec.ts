import { ArticleFormatter } from '../src/articles/article.formatter';
import { Article } from '../src/articles/article.model';

describe('ArticleFormatter', () => {
  it('formats an article for API output', () => {
    const formatter = new ArticleFormatter();
    const article: Article = {
      id: 'a-1',
      title: 'engineering update',
      content: 'one   two three',
      summary: ' short summary ',
      ownerId: 'u-1',
      topics: ['AI', 'engineering', 'ai'],
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    };

    expect(formatter.format(article)).toEqual({
      id: 'a-1',
      title: 'Engineering update',
      summary: 'short summary',
      excerpt: 'one two three',
      wordCount: 3,
      readingTimeMinutes: 1,
      topics: ['ai', 'engineering'],
      ownerId: 'u-1',
      createdAt: '2026-01-01T00:00:00.000Z',
    });
  });
});
