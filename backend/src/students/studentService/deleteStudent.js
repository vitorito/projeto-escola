import userService from '../../users/userService';
import findStudentByUserId from './findStudentByUserId';

export default async (id) => {
  const student = await findStudentByUserId(id);
  const userId = student.user.id;
  await userService.deleteUser(userId);
};
