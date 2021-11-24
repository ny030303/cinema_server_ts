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
import { IMovieScore } from '../interfaces/IMovieScore';

export default class MovieScore extends Model<IMovieScore> {
  static initialize(instance) {
    return MovieScore.init({
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
      reservation_rate: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      sales: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      audience_count: {
        type: DataTypes.NUMBER,
        allowNull: false
      }
    }, {
      sequelize: instance,
      underscored: true, // '_(언더바)'를 허용할건지 말건지.
      modelName: 'MovieScore',
      tableName: 'movie_score',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
  };
  static associate(models) {
    let movie = models.find(v => v.name == 'movieModel').model;
    MovieScore.belongsTo(movie, {foreignKey: 'movie_id'});
  }
};
  