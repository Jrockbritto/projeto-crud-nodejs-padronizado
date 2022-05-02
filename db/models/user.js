'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

// Def Database Migration user Model

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
    }
  }
  User.init(
    {
      username: {
          type: DataTypes.STRING,
          field: 'username',
          unique: true
      },
      password: {
          type: DataTypes.STRING,
          field: 'password'
      },
      email: {
          type: DataTypes.STRING,
      },
      admin: {
        type: DataTypes.BOOLEAN,
      }
    },
    {
    sequelize,
    modelName: 'user',
    });
     return User;
  }