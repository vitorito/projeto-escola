import jwt from 'jsonwebtoken';
import userService from '../users/userService';

export const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json('Unauthorized');
  }

  const [, token] = authorization.split(' ');
  const { SECRET_TOKEN } = process.env;
  try {
    const { id, email } = jwt.verify(token, SECRET_TOKEN);
    const user = await userService.findUserByIdAndEmail(id, email);
    if (!user) {
      return res.status(401).json('Unauthorized');
    }
    req.userId = id;
    req.userEmail = email;
    req.userRole = user.role;
    return next();
  } catch (error) {
    return res.status(401).json('Unauthorized');
  }
};

export const hasAnyRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.userRole)) {
    return res.status(403).json('Access denied');
  }
  return next();
};

export default {
  loginRequired,
  hasAnyRole,
};
