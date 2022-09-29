import User from '../User';

export default async (id, email) => User.findOne({ where: { id, email } });
