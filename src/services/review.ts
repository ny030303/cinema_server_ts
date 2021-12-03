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
  @Inject('movieReviewModel') public movieReviewModel: MovieReview

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

  public getNow() {
    let d = new Date();
      let fomatDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString();
      return fomatDate.replace("T", " ").slice(0, -5);
  }
//Promise<[Movie]> 
  public async writeReview(req: any) {
    try {
      let model;
      model = this.movieReviewModel;
      const created = this.getNow();
      
      const res = await model.create({
        movie_id: req.body.movie_id, site: "this", created: created, writer: req.currentUser.id, 
        comment: req.body.comment, like_num: 0, rating_num: req.body.rating_num
      });
      // console.log(movieRes);
      return res;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async editReview(req: any) {
    try {
      let model;
      model = this.movieReviewModel;
      const created = this.getNow();
      
      const res = await model.update(
        {created: created, comment: req.body.comment, rating_num: req.body.rating_num}, 
        {where: {idx: req.body.idx, movie_id: req.body.movie_id, writer: req.currentUser.id}}
      );
      // console.log(movieRes);
      return res;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteReview(req: any) {
    try {
      let model;
      model = this.movieReviewModel;
      const res = await model.destroy(
        { where: {idx: req.body.idx, movie_id: req.body.movie_id, writer: req.currentUser.id}}
      );
      // console.log(movieRes);
      return res;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}