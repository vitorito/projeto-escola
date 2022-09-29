import findUserById from './findUserById';

export default async (id, newUserData) => {
  const user = await findUserById(id);

  const updatedUser = await user.update({
    name: newUserData.name,
    email: newUserData.email,
  });

  return updatedUser;
};
