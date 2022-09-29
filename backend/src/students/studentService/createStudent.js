import { enrollmentAlreadyInUse } from '../../errors/studentErrors';
import { emailAlreadyInUse } from '../../errors/userErrors';
import userRoles from '../../users/userRoles';
import userService from '../../users/userService';
import Student from '../Student';
import existsByEnrollment from './existsByEnrollment';

export default async (student) => {
  const {
    name, email, password, enrollment, age,
  } = student;

  if (await userService.existsUserByEmail(email)) {
    throw emailAlreadyInUse();
  }
  if (await existsByEnrollment(enrollment)) {
    throw enrollmentAlreadyInUse();
  }

  const user = await userService.store({
    name, email, password, role: userRoles.STUDENT,
  });

  try {
    const newStudent = await Student.create({
      enrollment,
      age,
      user_id: user.id,
    });
    newStudent.user = user;
    return newStudent;
  } catch (err) {
    await user.destroy();
    throw err;
  }
};
