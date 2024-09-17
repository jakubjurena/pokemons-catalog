import { isEmail } from 'class-validator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

const ACCESS_TOKEN_MOCK_PREFIX = 'access_token_';

export const getAccessTokenMock = (email: string): string => {
  return `${ACCESS_TOKEN_MOCK_PREFIX}${email}`;
};

export const getActiveUserDataMock = (token: string): ActiveUserData => {
  const groups = new RegExp(`^(${ACCESS_TOKEN_MOCK_PREFIX})(.*)`).exec(token);
  if (!groups || groups[2] === undefined || !isEmail(groups[2])) {
    throw new Error('Invalid access token');
  }
  const email = groups[2];
  return { email };
};
