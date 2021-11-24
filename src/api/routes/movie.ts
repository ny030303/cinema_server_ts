import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import MovieService from '../../services/movie';

const route = Router();

export default (app: Router) => {
  const logger:Logger = Container.get('logger');

  app.use('/movie', route);

  route.get('/rank', async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling get-movie-rank endpoint');
      try {
        const movieServiceInstance = Container.get(MovieService);
        const dbResult = await movieServiceInstance.getRank(req);
        return res.status(201).json({dbResult});
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/rating', async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling get-movie-rating endpoint');
    try {
      const movieServiceInstance = Container.get(MovieService);
      const dbResult = await movieServiceInstance.getRating(req);
      return res.status(201).json({dbResult});
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);

};