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
  public async getRank(req: Request):Promise<[Movie]> {
    try {
      let model;
      model = this.movieModel;
      
      const movieRes = await model.findAll({
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
      });
      console.log(movieRes);
      return movieRes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getRating(req: Request):Promise<object[]> {
    try {
      let model;
      model = this.movieModel;

      let sql ="select a.*, b.*, c.* from movie as a, "+
                  "(SELECT movie_id, AVG(rating_num) rating_num "+
                        "FROM `movie_review` " +
                        "where rating_num != -1 " +
                        "group by movie_id) as b," +
                        "movie_graph as c " +
                    "where a.movie_id = b.movie_id AND b.movie_id = c.movie_id " +
                    "ORDER BY b.rating_num desc ";

      const movieRes = await this.seqInstance.query(sql, { type: QueryTypes.SELECT });

      // const movieRes = await review.findAll({
      //   offset: 0, limit: 3,
      //   where: {rating_num: {[Op.ne]: -1}}
      // });

      // const movieRes = await model.findAll({
      //   subQuery: false,
      //   offset: 0, limit: 3,
      //   attributes: [ 'movie_id', 'title'],
      //   required: true,
      //   row: true,
      //   include: [
      //     {
      //       model: this.movieReviewModel,
      //       // attributes: ['rating_num'],
      //       attributes: [[Sequelize.fn('AVG',Sequelize.col('rating_num')), 'avgRating'], 'writer'],
      //       required: false,
      //       // as: 'reviews',
      //       where: {rating_num: {[Op.ne]: -1}},
      //       group: ['writer'],
      //     },
      //     {
      //       model: this.movieGraphModel,
      //       attributes: ['jqplot_sex', 'jqplot_age', 'charm_point'],
      //       required: true
      //     },
      //   ],
      //   where: {
      //     // [`$reviews.rating_num$`]: {
      //     //   [Op.ne]: -1
      //     // }
      //   },
      //   group: ['title']
      //   // order: [
      //   //   ['rating_num', 'DESC']
      //   // ]
      // });
      console.log(movieRes);
      return movieRes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}