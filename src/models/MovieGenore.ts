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
import { IMovieGenore } from '../interfaces/IMovieGenore';

export default class MovieGenore extends Model<IMovieGenore> {
  static initialize(instance) {
    return MovieGenore.init({
      keyword: {
        type: DataTypes.STRING(150),
        allowNull: false,
        primaryKey: true
      }
    }, {
      sequelize: instance,
      underscored: true, // '_(언더바)'를 허용할건지 말건지.
      modelName: 'MovieGenore',
      tableName: 'movie_genore',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
  };
  static associate(models) {

  }
};
  