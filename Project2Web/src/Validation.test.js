import { UserNameValid, PasswordValid } from './Validation/Validation';

describe('UserNameValid function', () => {
  test('returns error message if username is empty', () => {
    expect(UserNameValid('')).toBe('Username must contain at least one character from [a-zA-Z]');
  });

  test('returns error message if username contains no alphabet characters', () => {
    expect(UserNameValid('123')).toBe('Username must contain at least one character from [a-zA-Z]');
  });

  test('returns empty string if username contains alphabet characters', () => {
    expect(UserNameValid('user')).toBe('');
  });
});

describe('PasswordValid function', () => {
  test('returns error message if password is less than 8 characters', () => {
    expect(PasswordValid('pass')).toBe('password must contain at least 8 characters ');
  });

  test('returns error message if password contains no digit', () => {
    expect(PasswordValid('Password')).toBe('password must contain at least one digit');
  });

  test('returns error message if password contains no uppercase letter', () => {
    expect(PasswordValid('password1')).toBe('password must contain at least one uppercase letter');
  });

  test('returns error message if password contains no lowercase letter', () => {
    expect(PasswordValid('PASSWORD1')).toBe('password must contain at least one lowercase letter');
  });

  test('returns error message if password contains no special character', () => {
    expect(PasswordValid('Password1')).toBe('password must contain at least one special character');
  });

  test('returns empty string if password meets all requirements', () => {
    expect(PasswordValid('Password1!')).toBe('');
  });
});
