import 'reflect-metadata';
import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/event';
import MovieGenore from '../models/MovieGenore';
import MovieRated from '../models/MovieRated';
import { Request } from 'express-serve-static-core';
import { Sequelize, Model } from 'sequelize/types';

@Service()
export default class KeywordService {
  @Inject('movieGenoreModel') private movieGenoreModel: MovieGenore
  @Inject('movieRatedModel') private movieRatedModel: MovieRated
  // private mailer: MailerService,
  @Inject('logger') private logger
  @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  constructor() {}
//Promise<IKeywordDTO>
  public async getKeywords(req: Request):Promise<[MovieGenore]> {
    try {
      let model;
      if(req.query.key == "genore") model = this.movieGenoreModel;
      else if(req.query.key == "rated") model = this.movieRatedModel;
      else {throw new Error('Cannot found key');}
      // console.log(model);
      const keyRes = (await model.findAll({attributes: ['keyword']})).map(u => u.get("keyword"));
      // console.log(keyRes.get("keyword");
      return keyRes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}