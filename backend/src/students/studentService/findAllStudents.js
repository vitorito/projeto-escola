import Student from '../Student';

export default async () => Student.findAll({ include: [{ all: true }] });
