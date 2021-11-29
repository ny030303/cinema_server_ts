import {
  Sequelize, 
  DataTypes, 
  Model, 
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association
} from 'sequelize';
import { IUser } from '../interfaces/IUser';

export default class User extends Model<IUser> {
  static initialize(instance) {
    return User.init({
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      pwd:  {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      profile_url:  {
        type: DataTypes.STRING(300),
        allowNull: false
      }
    }, {
      sequelize: instance,
      underscored: true, // '_(언더바)'를 허용할건지 말건지.
      modelName: 'User',
      tableName: 'user',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
  };
  static associate(models) {

  }
};
  