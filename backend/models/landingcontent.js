'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LandingContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LandingContent.init({
    section: DataTypes.STRING,
    key_name: DataTypes.STRING,
    value: DataTypes.TEXT,
    type: DataTypes.STRING,
    sort_order: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'LandingContent',
    tableName: 'LandingContent',
  });
  return LandingContent;
};