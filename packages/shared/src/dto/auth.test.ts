import { describe, expect, it } from 'vitest';
import { RegisterRequestSchema, LoginRequestSchema } from './auth';

describe('authentication input', () => {
  it('normalizes email consistently for login and registration', () => {
    const input = { email: '  Member@Church.Test ', password: 'Test@1234', fullName: ' Member ', phone: '' };
    expect(RegisterRequestSchema.parse(input)).toMatchObject({ email: 'member@church.test', fullName: 'Member' });
    expect(LoginRequestSchema.parse(input).email).toBe('member@church.test');
  });

  it('rejects short registration passwords and malformed phone numbers', () => {
    expect(RegisterRequestSchema.safeParse({ email: 'member@church.test', fullName: 'Member', password: 'short' }).success).toBe(false);
    expect(RegisterRequestSchema.safeParse({ email: 'member@church.test', fullName: 'Member', password: 'Test@1234', phone: 'hello' }).success).toBe(false);
  });
});
