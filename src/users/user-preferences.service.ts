import { Injectable } from '@nestjs/common';

export interface UserPreferences {
  topics: string[];
  emailNotifications: boolean;
}

@Injectable()
export class UserPreferencesService {
  async getForUser(_userId: string): Promise<UserPreferences> {
    // Local stand-in for independent remote preference-service I/O.
    await new Promise((resolve) => setTimeout(resolve, 40));
    return {
      topics: ['engineering', 'ai'],
      emailNotifications: true,
    };
  }
}
