import findUserById from './findUserById';

export default async (id) => {
  const user = await findUserById(id);
  await user.destroy();
};
