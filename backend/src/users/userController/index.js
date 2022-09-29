import createUser from './createUser';
import deleteUser from './deleteUser';
import findAllUsers from './findAllUsers';
import findUserbyId from './findUserbyId';
import updateUser from './updateUser';

export default {
  index: findAllUsers,
  show: findUserbyId,
  store: createUser,
  update: updateUser,
  deleteUser,
};
