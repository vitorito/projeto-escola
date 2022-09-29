import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static async init(sequelize) {
    super.init({
      enrollment: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [11, 11],
            msg: 'The enrollment field must have 11 characters',
          },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          min: {
            args: [1],
            msg: 'The age field must be an integer greater than 0',
          },
          max: {
            args: [150],
            msg: 'The age field must be an integer less than 150',
          },
          isInt: {
            msg: 'The age field must be an integer greater than 0',
          },
        },
      },
      created_at: Sequelize.VIRTUAL,
      updated_at: Sequelize.VIRTUAL,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasOne(models.StudentPhoto, { foreignKey: 'student_id', as: 'profile_pic' });
  }
}
