"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LandingContent", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      section: {
        type: Sequelize.STRING,
      },
      key_name: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.ENUM("text", "image"),
      },
      sort_order: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LandingContent");
  },
};
