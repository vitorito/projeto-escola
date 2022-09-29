import userRoles from '../userRoles';
import userService from '../userService';

export default async (req, res) => {
  const {
    name, email, password,
  } = req.body;

  const newUser = await userService.store({
    name, email, password, role: userRoles.ADMIN,
  });

  const userDto = userService.generateUserDto(newUser);
  return res.status(201).json(userDto);
};
