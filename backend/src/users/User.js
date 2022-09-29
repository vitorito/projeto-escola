import bcryptjs from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';
import userRoles from './userRoles';

export default class User extends Model {
  static async init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'The field name must be between 2 and 255 characters',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      password_hash: Sequelize.STRING,
      password: {
        type: Sequelize.VIRTUAL,
        validate: {
          len: {
            args: [4, 20],
            msg: 'The field password must be between 4 and 20 characters',
          },
        },
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isIn: {
            args: [[userRoles.ADMIN, userRoles.STUDENT]],
            msg: `The role field should be one of these: ['${userRoles.ADMIN}', '${userRoles.STUDENT}']`,
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }
}
