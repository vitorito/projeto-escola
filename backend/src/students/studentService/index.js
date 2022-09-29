import createStudent from './createStudent';
import deleteStudent from './deleteStudent';
import findAllStudents from './findAllStudents';
import findStudentById from './findStudentById';
import findStudentByUserId from './findStudentByUserId';
import generateStudentDto from './generateStudentDto';
import updateStudent from './updateStudent';

export default {
  index: findAllStudents,
  show: findStudentById,
  store: createStudent,
  update: updateStudent,
  deleteStudent,
  generateStudentDto,
  findStudentByUserId,
};
