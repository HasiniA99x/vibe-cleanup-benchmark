import { Injectable } from '@nestjs/common';
import { AiClient } from './ai-client';

@Injectable()
export class OpenAiClient implements AiClient {
  async summarize(text: string): Promise<string> {
    const token = process.env.AI_API_TOKEN;
    if (token) {
      console.log(`[ai] using token ${token}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const compact = text.replace(/\s+/g, ' ').trim();
    return compact.length <= 120 ? compact : `${compact.slice(0, 117)}...`;
  }
}
