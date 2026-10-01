import { Injectable } from '@nestjs/common';
import { AiClientFactory } from './ai-client.factory';

@Injectable()
export class ClientWrapper {
  constructor(private readonly factory: AiClientFactory) {}

  summarize(text: string): Promise<string> {
    return this.factory.getClient().summarize(text);
  }
}
