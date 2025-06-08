'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kontak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kontak.init({
    telepon: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    gmaps: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kontak',
    tableName: 'Kontak',
  });
  return Kontak;
};