import { Injectable } from '@nestjs/common';
import { AiClient } from './ai-client';
import { OpenAiClient } from './openai-ai-client';

@Injectable()
export class AiClientFactory {
  constructor(private readonly openAiClient: OpenAiClient) {}

  getClient(): AiClient {
    return this.openAiClient;
  }
}
