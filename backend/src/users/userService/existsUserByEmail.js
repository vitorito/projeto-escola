import findUserByEmail from './findUserByEmail';

export default async (email) => {
  const user = await findUserByEmail(email);
  return !!user;
};
