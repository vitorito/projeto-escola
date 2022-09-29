import CustomApiError from './CustomApiError';

export const userNotFound = () => {
  const message = 'User not found';
  const statusCode = 404;
  return new CustomApiError(message, statusCode);
};

export const emailAlreadyInUse = () => {
  const message = 'This email is already in use';
  const statusCode = 409;
  return new CustomApiError(message, statusCode);
};

export default {
  userNotFound,
  emailAlreadyInUse,
};
