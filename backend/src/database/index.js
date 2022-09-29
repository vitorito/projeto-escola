import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Student from '../students/Student';
import StudentPhoto from '../student_photos/StudentPhoto';
import User from '../users/User';

const connection = new Sequelize(databaseConfig);

const models = [User, Student, StudentPhoto];

models.forEach(async (model) => {
  await model.init(connection);
  if (model.associate) {
    model.associate(connection.models);
  }
});

export default connection;
