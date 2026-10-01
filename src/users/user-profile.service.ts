import { Injectable } from '@nestjs/common';

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
}

@Injectable()
export class UserProfileService {
  async getByUserId(userId: string): Promise<UserProfile> {
    // Local stand-in for remote profile-service I/O used by this benchmark.
    await new Promise((resolve) => setTimeout(resolve, 40));
    return {
      id: userId,
      displayName: `User ${userId}`,
      email: `${userId}@example.test`,
    };
  }
}
