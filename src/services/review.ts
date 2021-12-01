import 'reflect-metadata';
import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { Request } from 'express-serve-static-core';
import { Sequelize, Model, Op, QueryTypes } from 'sequelize';
import Movie from '../models/Movie';
import MovieGraph from '../models/MovieGraph';
import MovieScore from '../models/MovieScore';
import MovieReview from '../models/MovieReview';

@Service()
export default class ReviewService {
  // @Inject('movieModel') private movieModel: Movie
  // @Inject('movieGraphModel') private movieGraphModel: MovieGraph
  // @Inject('movieScoreModel') private movieScoreModel: MovieScore
  @Inject('movieReviewModel') public movieReviewModel: MovieReview
  
  // private mailer: MailerService,
  @Inject('logger') private logger
  @Inject('sequelizeInstance') private seqInstance: Sequelize
  @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  constructor() {}
//Promise<IKeywordDTO>
  public async getReview(movieId: String):Promise<[Movie]> {
    try {
      let model;
      model = this.movieReviewModel;
      
      const movieRes = await model.findAll({
        where: {movie_id: movieId},
        order: [['idx', 'DESC'], ['like_num', 'DESC']]
        // offset: 0, limit: 3,
      });
      console.log(movieRes);
      return movieRes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
//Promise<[Movie]> 
  public async writeReview(req: Request) {
    try {
      let model;
      model = this.movieReviewModel;
      
      // const movieRes = await model.create({
      //   movie_id: ,
      //   site:,
      //   created:,
      //   writer:,
        
      // });
      // console.log(movieRes);
      // return movieRes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}