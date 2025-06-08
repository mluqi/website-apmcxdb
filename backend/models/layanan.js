'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Layanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Layanan.init({
    title: DataTypes.STRING,
    konten: DataTypes.TEXT,
    image: DataTypes.TEXT,
    button_text: DataTypes.STRING,
    button_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Layanan',
    tableName: 'Layanan',
  });
  return Layanan;
};