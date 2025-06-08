'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lokasihotspot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lokasihotspot.init({
    nama: DataTypes.STRING,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    alamat: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'lokasihotspot',
    tableName: 'lokasihotspot',
  });
  return lokasihotspot;
};