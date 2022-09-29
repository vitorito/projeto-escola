import createStudent from './createStudent';
import deleteStudent from './deleteStudent';
import findAllStudents from './findAllStudents';
import findStudent from './findStudent';
import updateStudent from './updateStudent';

export default {
  index: findAllStudents,
  show: findStudent,
  store: createStudent,
  update: updateStudent,
  deleteStudent,
};
