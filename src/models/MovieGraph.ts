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
import { IMovieGraph } from '../interfaces/IMovieGraph';

export default class MovieGraph extends Model<IMovieGraph> {
  static initialize(instance) {
    return MovieGraph.init({
      movie_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      site: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      created: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      jqplot_sex: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      jqplot_age: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      charm_point: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize: instance,
      underscored: true, // '_(언더바)'를 허용할건지 말건지.
      modelName: 'MovieGraph',
      tableName: 'movie_graph',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false
    });
  };
  static associate(models) {
    let movie = models.find(v => v.name == 'movieModel').model;
    MovieGraph.belongsTo(movie, {foreignKey: 'movie_id'});
  }
};
  