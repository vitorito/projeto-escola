import loginService from '../../login/loginService';
import studentService from '../studentService';

export default async (req, res) => {
  const {
    enrollment, name, email, password, age,
  } = req.body;

  const newStudent = await studentService.store({
    enrollment, name, email, password, age,
  });
  const newStudentDto = studentService.generateStudentDto(newStudent);
  const credentials = loginService.generateCredentials(newStudentDto);
  return res.status(201).json(credentials);
};
