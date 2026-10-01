export interface AiClient {
  summarize(text: string): Promise<string>;
}
