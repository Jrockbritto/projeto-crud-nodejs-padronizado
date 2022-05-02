import sequelize from '../sequelize';
import User from '../models/user.model';
import { DataTypes } from 'sequelize/types';

const bcrypt = require('bcrypt');

// def User model instance

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    field: 'username'
  },
  password: {
    type: DataTypes.STRING,
    field: 'password',
    unique: true
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
    hooks: {
      beforeCreate: (User: User) => {
        const salt = bcrypt.genSaltSync();
        User.password = bcrypt.hashSync(User.password, salt);
      },
      beforeUpdate: (User: User) => {
        const salt = bcrypt.genSaltSync();
        User.password = bcrypt.hashSync(User.password, salt);
      }
    }
  });
User.prototype.validatePassword = function (password: String) {
  return bcrypt.compareSync(password, this.password);
}

export default User;