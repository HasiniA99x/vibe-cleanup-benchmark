import { EmailSender } from '../src/notifications/email.sender';

describe('EmailSender', () => {
  const original = process.env.EMAIL_FORCE_TRANSIENT_FAILURE;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.EMAIL_FORCE_TRANSIENT_FAILURE;
    } else {
      process.env.EMAIL_FORCE_TRANSIENT_FAILURE = original;
    }
  });

  it('succeeds when the provider succeeds', async () => {
    delete process.env.EMAIL_FORCE_TRANSIENT_FAILURE;
    await expect(
      new EmailSender().send('person@example.test', 'hello'),
    ).resolves.toBeUndefined();
  });

  it('fails after the required bounded retry attempts', async () => {
    process.env.EMAIL_FORCE_TRANSIENT_FAILURE = 'true';
    await expect(
      new EmailSender().send('person@example.test', 'hello'),
    ).rejects.toThrow('Transient email provider failure');
  });
});
