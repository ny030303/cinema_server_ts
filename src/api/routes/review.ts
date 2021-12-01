import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import ReviewService from '../../services/review';
import localFormDataUpload from '../middlewares/localMulter';

const route = Router();

export default (app: Router) => {
  const logger:Logger = Container.get('logger');

  app.use('/review', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling get-review endpoint');
    try {
      let id = req.query.movie_id + '';
      const reviewServiceInstance = Container.get(ReviewService);
      const dbResult = await reviewServiceInstance.getReview(id);
      return res.status(201).json({dbResult});
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.put('/write', localFormDataUpload.none(), async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling insert-review endpoint');
    try {
      let id = req.query.movie_id + '';
      const reviewServiceInstance = Container.get(ReviewService);
      const dbResult = await reviewServiceInstance.writeReview(req);
      return res.status(201).json({dbResult});
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};