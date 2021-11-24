import { Sequelize, Dialect } from 'sequelize';
import config from '../config';

export default (): { seqInstance: Sequelize, models: { name: string; model: any }[] } => {
    let temp = config.sequealize.development;
    // console.log(temp);
    /* 'cinema', 'root', 'jung7921', {
        host: 'localhost',
        dialect: 'mysql'
      }
       */
    const seqInstance = new Sequelize(
        temp.database, 
        temp.username,
        temp.password, 
        {
            host: temp.options.host, 
            dialect: temp.options.dialect as 'mysql'
        }
    );
    const modelArr = [ 
        {name:'movieModel', model: require('../models/Movie').default},
        {name:'movieGenoreModel', model: require('../models/MovieGenore').default},
        {name:'movieGraphModel', model: require('../models/MovieGraph').default},
        {name:'movieRatedModel', model: require('../models/MovieRated').default},
        {name:'movieReviewModel', model: require('../models/MovieReview').default},
        {name:'movieScoreModel', model: require('../models/MovieScore').default}
    ];
    let db = {seqInstance: seqInstance, models: modelArr};
    db.models.forEach(element => {element.model.initialize(seqInstance);});
    db.models.forEach(element => {element.model.associate(db.models);});
    // db.Movie.initialize(seqInstance);
    // db.Movie.associate(db);
    return db;
};
