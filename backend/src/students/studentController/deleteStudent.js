import studentService from '../studentService';

export default async (req, res) => {
  const { id } = req.params;
  await studentService.deleteStudent(id);
  return res.end();
};
