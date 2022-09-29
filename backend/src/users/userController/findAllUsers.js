import userService from '../userService';

export default async (req, res) => {
  const users = await userService.index();
  const usersDtos = users.map((user) => userService.generateUserDto(user));
  return res.json(usersDtos);
};
