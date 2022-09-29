import studentService from '../studentService';

export default async (req, res) => {
  const { id } = req.params;
  const student = await studentService.findStudentByUserId(id);
  const studentDto = studentService.generateStudentDto(student);
  return res.json(studentDto);
};
