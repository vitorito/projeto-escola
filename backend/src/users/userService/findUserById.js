import { userNotFound } from '../../errors/userErrors';
import User from '../User';

export default async (id, required = true) => {
  const user = await User.findByPk(id);
  if (required && !user) {
    throw userNotFound();
  }
  return user;
};
