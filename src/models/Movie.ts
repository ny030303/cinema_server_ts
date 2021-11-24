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
import { IMovie } from '../interfaces/Imovie';

export default class Movie extends Model<IMovie> {
  static initialize(instance) {
    return Movie.init({
      movie_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      eng_title: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      production_year: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      production_country: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      size_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      genore: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      production_status: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      poster_img: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      release_date: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      updated_date: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      memo: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      director: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      actor: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      story: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize: instance,
      // timestamps:true,
      paranoid : true,
      underscored: true, // '_(언더바)'를 허용할건지 말건지.
      modelName: 'Movie',
      tableName: 'movie',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
  };
  static associate(models) {
    let review = models.find(v => v.name == 'movieReviewModel').model;
    let graph = models.find(v => v.name == 'movieGraphModel').model;
    let score = models.find(v => v.name == 'movieScoreModel').model;
    Movie.hasMany(review, {foreignKey: 'movie_id'});
    // Movie.hasMany(review, {foreignKey: 'movie_id', as: 'reviews'});
    Movie.hasMany(graph, {foreignKey: 'movie_id'});
    Movie.hasMany(score, {foreignKey: 'movie_id'});
    // Movie.hasMany(graph, {foreignKey: 'movie_id', as: 'graph'});
    // Movie.hasMany(score, {foreignKey: 'movie_id', as: 'score'});
  }
};
  