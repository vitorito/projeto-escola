import userService from '../userService';

export default async (req, res) => {
  const { id } = req.params;

  const user = await userService.show(id);
  const userDto = userService.generateUserDto(user);
  return res.json(userDto);
};
