import { userNotFound } from '../../errors/userErrors';
import Student from '../Student';

export default async (id, required = true) => {
  const student = await Student.findByPk(id, { include: [{ all: true }] });
  if (required && !student) {
    throw userNotFound();
  }
  return student;
};
