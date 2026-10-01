import { Injectable } from '@nestjs/common';
import { EmailSender } from './email.sender';
import { SmsSender } from './sms.sender';

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailSender: EmailSender,
    private readonly smsSender: SmsSender,
  ) {}

  async notify(email: string, title: string): Promise<void> {
    await this.emailSender.send(email, `Article ready: ${title}`);

    if (process.env.ENABLE_SMS === 'true') {
      await this.smsSender.send('+10000000000', `Article ready: ${title}`);
    }
  }
}
