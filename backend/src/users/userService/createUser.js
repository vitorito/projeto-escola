import { emailAlreadyInUse } from '../../errors/userErrors';
import User from '../User';
import existsUserByEmail from './existsUserByEmail';

export default async (userData) => {
  if (await existsUserByEmail(userData.email)) {
    throw emailAlreadyInUse();
  }
  return User.create(userData);
};
