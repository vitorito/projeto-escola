import userService from '../userService';

export default async (req, res) => {
  const { id } = req.params;
  await userService.update(id, req.body);
  return res.end();
};
