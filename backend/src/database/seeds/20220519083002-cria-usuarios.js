/* eslint-disable no-unused-vars */

const bcryptjs = require('bcryptjs');
const { default: userRoles } = require('../../users/userRoles');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin',
          email: 'admin@gmail.com',
          password_hash: await bcryptjs.hash('admin', 8),
          role: userRoles.ADMIN,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
