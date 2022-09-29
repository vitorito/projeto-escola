import loginService from '../../login/loginService';
import studentService from '../studentService';

export default async (req, res) => {
  const { id } = req.params;
  const {
    name, email, enrollment, age,
  } = req.body;

  const student = await studentService.update(id, {
    name, email, enrollment, age,
  });

  const studentDto = studentService.generateStudentDto(student);
  const newCredentials = loginService.generateCredentials(studentDto, { id, email });
  return res.json(newCredentials);
};
