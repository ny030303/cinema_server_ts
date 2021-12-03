import 'reflect-metadata';
import { Service, Inject } from 'typedi';
// import jwt from 'jsonwebtoken';
// import MailerService from './mailer';
import config from '../config';
// import argon2 from 'argon2';
// import { randomBytes } from 'crypto';
import { IKeywordDTO } from '../interfaces/IKeywordDTO';
import { IMovieRated } from '../interfaces/IMovieRated';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/event';
import { Request } from 'express-serve-static-core';
import { Sequelize, Model, Op, QueryTypes } from 'sequelize';
import Movie from '../models/Movie';
import MovieGraph from '../models/MovieGraph';
import MovieScore from '../models/MovieScore';
import MovieReview from '../models/MovieReview';

@Service()
export default class MovieService {
  @Inject('movieModel') private movieModel: Movie
  @Inject('movieGraphModel') private movieGraphModel: MovieGraph
  @Inject('movieScoreModel') private movieScoreModel: MovieScore
  @Inject('movieReviewModel') public movieReviewModel: MovieReview
  
  // private mailer: MailerService,
  @Inject('logger') private logger
  @Inject('sequelizeInstance') private seqInstance: Sequelize
  @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  constructor() {}
//Promise<IKeywordDTO>
  public async getRank(req: any):Promise<[Movie]> {
    try {
      let model, movieRes;
      model = this.movieModel;
      let obj =  {
        offset: 0, limit: 3,
        include: [
           {
             model: this.movieGraphModel,
             attributes: ['jqplot_sex', 'jqplot_age', 'charm_point'],
             require: true
           }, 
           {
             model: this.movieScoreModel,
             attributes: ['reservation_rate', 'sales', 'audience_count'],
             where: Sequelize.where(
              Sequelize.fn('DATE_FORMAT', Sequelize.fn('now'),  '%Y-%m-%d'),
              Sequelize.fn('left', Sequelize.col('MovieScores.created'), 10)
            )
           }
        ]
      };
      if(req.query.count)  movieRes = await model.count(obj);
       else  movieRes = await model.findAll(obj);
      
      console.log(movieRes);
      return movieRes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public makeCountQuery = (sql) => {
    return "select count(*) 'count_num' from (" + sql + ") temp_name"; 
  };

  public async getRating(req: any):Promise<object[]> {
    try {
      let model, movieRes;
      model = this.movieModel;

      let sql =`select a.*, AVG(b.rating_num) rating_num_avg, c.jqplot_sex, c.jqplot_age, c.charm_point from movie as a 
                  inner join movie_review b ON a.movie_id = b.movie_id AND b.rating_num != -1
                  left outer join movie_graph c ON a.movie_id = c.movie_id
                  GROUP BY a.movie_id, b.movie_id, c.movie_id, c.jqplot_sex, c.jqplot_age, c.charm_point
                  ORDER BY rating_num_avg desc`;

      
      if(req.query.count)  movieRes = await this.seqInstance.query(this.makeCountQuery(sql), { type: QueryTypes.SELECT });
       else  movieRes = await this.seqInstance.query(sql, { type: QueryTypes.SELECT });
      console.log(movieRes);
      return movieRes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}