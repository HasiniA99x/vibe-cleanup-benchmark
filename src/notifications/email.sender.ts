import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSender {
  async send(to: string, subject: string): Promise<void> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await this.sendOnce(to, subject);
        return;
      } catch (error) {
        lastError = error;
        if (attempt === 3) {
          break;
        }
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error('Email delivery failed after retries');
  }

  private async sendOnce(_to: string, _subject: string): Promise<void> {
    if (process.env.EMAIL_FORCE_TRANSIENT_FAILURE === 'true') {
      throw new Error('Transient email provider failure');
    }

    console.log('[email] delivered');
  }
}
