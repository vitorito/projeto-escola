import CustomApiError from './CustomApiError';

export const enrollmentAlreadyInUse = () => {
  const message = 'This enrollment is already in use';
  const statusCode = 409;
  return new CustomApiError(message, statusCode);
};

export default {
  enrollmentAlreadyInUse,
};
