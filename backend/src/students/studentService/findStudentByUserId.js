import Student from '../Student';

export default async (id) => Student.findOne(
  {
    where: { user_id: id },
    include: [{ all: true }],
  },
);
