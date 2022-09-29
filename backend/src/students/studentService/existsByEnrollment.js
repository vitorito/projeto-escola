import Student from '../Student';

export default async (enrollment) => Student.findOne(
  {
    where: { enrollment },
  },
);
