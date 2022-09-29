import User from '../User';

export default async (email) => User.findOne({
  where: { email },
  include: [{ all: true }],
});
