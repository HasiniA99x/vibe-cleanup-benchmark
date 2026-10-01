import { Injectable } from '@nestjs/common';
import { Article } from './article.model';

export interface FormattedArticle {
  id: string;
  title: string;
  summary: string;
  excerpt: string;
  wordCount: number;
  readingTimeMinutes: number;
  topics: string[];
  ownerId: string;
  createdAt: string;
}

@Injectable()
export class ArticleFormatter {
  format(article: Article): FormattedArticle {
    const normalizedContent = this.normalizeWhitespace(article.content);
    const wordCount = this.countWords(normalizedContent);

    return {
      id: article.id,
      title: this.normalizeTitle(article.title),
      summary: article.summary.trim(),
      excerpt: this.buildExcerpt(normalizedContent, 160),
      wordCount,
      readingTimeMinutes: this.calculateReadingTime(wordCount),
      topics: this.normalizeTopics(article.topics),
      ownerId: article.ownerId,
      createdAt: article.createdAt.toISOString(),
    };
  }

  private normalizeWhitespace(value: string): string {
    return value.replace(/\s+/g, ' ').trim();
  }

  private normalizeTitle(value: string): string {
    const normalized = this.normalizeWhitespace(value);
    if (normalized.length === 0) {
      return normalized;
    }
    return `${normalized[0].toUpperCase()}${normalized.slice(1)}`;
  }

  private countWords(value: string): number {
    if (!value) {
      return 0;
    }
    return value.split(' ').filter(Boolean).length;
  }

  private calculateReadingTime(wordCount: number): number {
    if (wordCount === 0) {
      return 0;
    }
    return Math.max(1, Math.ceil(wordCount / 220));
  }

  private buildExcerpt(value: string, maxLength: number): string {
    if (value.length <= maxLength) {
      return value;
    }

    const cut = value.slice(0, maxLength - 3);
    const lastSpace = cut.lastIndexOf(' ');
    const safeCut = lastSpace > maxLength / 2 ? cut.slice(0, lastSpace) : cut;
    return `${safeCut}...`;
  }

  private normalizeTopics(topics: string[]): string[] {
    const unique = new Set<string>();

    for (const topic of topics) {
      const normalized = topic.trim().toLowerCase();
      if (normalized) {
        unique.add(normalized);
      }
    }

    return [...unique].sort();
  }
}
