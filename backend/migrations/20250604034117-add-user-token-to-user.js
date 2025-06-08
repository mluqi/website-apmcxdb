'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'user_token', { 
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      after: 'user_password'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'user_token'); 
  }
};
