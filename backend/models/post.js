'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    post_title: DataTypes.STRING,
    post_konten: DataTypes.TEXT,
    post_image: DataTypes.TEXT,
    post_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Post',
  });
  return Post;
};