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
import { IMovieReview } from '../interfaces/IMovieReview';

export default class MovieReview extends Model<IMovieReview> {
  static initialize(instance) {
    return MovieReview.init({
      idx: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      movie_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      site: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      created: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      writer: {
        type: DataTypes.STRING(200),
        allowNull: false,
        primaryKey: true
      },
      comment: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      like_num: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      rating_num: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
    }, {
      sequelize: instance,
      underscored: true, // '_(언더바)'를 허용할건지 말건지.
      modelName: 'MovieReview',
      tableName: 'movie_review',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
  };
  static associate(models) {
    let movie = models.find(v => v.name == 'movieModel').model;
    MovieReview.belongsTo(movie, {foreignKey: 'movie_id'});
    // MovieReview.belongsTo(movie, {foreignKey: 'movie_id', as: 'movies'});
  }
};
  