import findStudentByUserId from './findStudentByUserId';

export default async (id, userData) => {
  const student = await findStudentByUserId(id);

  const {
    name, email, enrollment, age,
  } = userData;
  await student.update({ enrollment, age });
  await student.user.update({ name, email });
  return student;
};
