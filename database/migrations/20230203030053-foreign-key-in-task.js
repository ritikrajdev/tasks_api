'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'userId', {
      'type': Sequelize.INTEGER,
      'allowNull': true,
      'references': {
        'model': 'users',
        'key': 'id'
      },
      'onDelete': 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'userId');
  }
};
