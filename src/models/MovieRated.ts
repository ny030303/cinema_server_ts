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
import { IMovieRated } from '../interfaces/IMovieRated';

export default class MovieRated extends Model<IMovieRated> {
  static initialize(instance) {
    return MovieRated.init({
      keyword: {
        type: DataTypes.STRING(150),
        allowNull: false,
        primaryKey: true
      }
    }, {
      sequelize: instance,
      underscored: true, // '_(언더바)'를 허용할건지 말건지.
      modelName: 'MovieRated',
      tableName: 'movie_rated',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
  };
  static associate(models) {

  }
};
  