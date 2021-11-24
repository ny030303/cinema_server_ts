import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './event';
// import { IUser } from '@/interfaces/IUser';
// import mongoose from 'mongoose';
import { Logger } from 'winston';
import { IKeywordDTO } from '../interfaces/IKeywordDTO';
import { IMovieGenore } from '../interfaces/IMovieGenore';
import { Model } from 'sequelize/types';
import { IMovieRated } from '../interfaces/IMovieRated';
import MovieGenore from '../models/MovieGenore';
import MovieRated from '../models/MovieRated';

@EventSubscriber()
export default class KeywordSubscriber {
  /**
   * A great example of an event that you want to handle
   * save the last time a user signin, your boss will be pleased.
   *
   * Altough it works in this tiny toy API, please don't do this for a production product
   * just spamming insert/update to mongo will kill it eventualy
   *
   * Use another approach like emit events to a queue (rabbitmq/aws sqs),
   * then save the latest in Redis/Memcache or something similar
   */
  @On(events.keyword.getKeywords)
  public onUserGetKeywords(keyModel:MovieGenore | MovieRated) {
    const Logger: Logger = Container.get('logger');

    try {
    //   const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;
    //   UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

      // Throw the error so the process die (check src/app.ts)
      throw e;
    }
  }
}