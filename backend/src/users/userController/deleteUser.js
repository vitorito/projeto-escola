import userService from '../userService';

export default async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res.end();
};
