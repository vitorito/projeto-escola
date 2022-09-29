import Sequelize, { Model } from 'sequelize';

export default class StudentPhoto extends Model {
  static async init(sequelize) {
    super.init({
      file_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'File name cannot be empty',
          },
        },
      },
      original_name: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Original file name cannot be Empty',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${process.env.BASE_URL}/images/${this.getDataValue('file_name')}`;
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}
