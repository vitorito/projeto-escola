import createUser from './createUser';
import deleteUser from './deleteUser';
import findAllUsers from './findAllUsers';
import findUserById from './findUserById';
import generateUserDto from './generateUserDto';
import updateUser from './updateUser';
import findUserByIdAndEmail from './findUserByIdAndEmail';
import findUserByEmail from './findUserByEmail';
import existsUserByEmail from './existsUserByEmail';

export default {
  index: findAllUsers,
  show: findUserById,
  store: createUser,
  update: updateUser,
  deleteUser,
  generateUserDto,
  findUserByIdAndEmail,
  findUserByEmail,
  existsUserByEmail,
};
