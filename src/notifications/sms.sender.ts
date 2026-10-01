import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsSender {
  async send(_phone: string, _message: string): Promise<void> {
    console.log('[sms-placeholder] send requested');
  }
}
