import studentService from '../studentService';

export default async (req, res) => {
  const students = await studentService.index();
  const studentsDtos = students.map(studentService.generateStudentDto);
  return res.json(studentsDtos);
};
