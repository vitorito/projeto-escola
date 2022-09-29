import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import studentService from '../students/studentService';
import userRoles from '../users/userRoles';
import userService from '../users/userService';

const generateToken = (payload) => {
  const { SECRET_TOKEN, TOKEN_EXPIRATION } = process.env;
  const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: TOKEN_EXPIRATION });
  return token;
};

const generateCredentials = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = generateToken(payload);
  return { token, user };
};

const isValidPassword = async (password, passwordHash) => {
  return bcryptjs.compare(password, passwordHash);
};

const login = async (email, password) => {
  const user = await userService.findUserByEmail(email);

  if (!user) return null;

  const isValidPwd = await isValidPassword(password, user.password_hash);

  if (!isValidPwd) return null;

  if (user.role === userRoles.STUDENT) {
    const student = await studentService.findStudentByUserId(user.id);
    const studentDto = studentService.generateStudentDto(student);
    return generateCredentials(studentDto);
  }

  const userDto = userService.generateUserDto(user);
  return generateCredentials(userDto);
};

export default {
  login,
  generateCredentials,
};
