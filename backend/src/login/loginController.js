/* eslint-disable no-unused-vars */

import loginService from './loginService';

const store = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json('Invalid login');
  }

  const userLogin = await loginService.login(email, password);
  if (!userLogin) {
    return res.status(401).json('Invalid login');
  }

  return res.json(userLogin);
};

export default {
  store,
};
