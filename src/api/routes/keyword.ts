import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import KeywordService from '../../services/keyword';
// import { IUserInputDTO } from '@/interfaces/IUser';
import middlewares from '../middlewares';
// import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/keyword', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {

      const logger:Logger = Container.get('logger');
      logger.debug('Calling get-keyword endpoint with query: %o', req.query );
      try {
        const keywordServiceInstance = Container.get(KeywordService);
        // SignUp(req.body as IUserInputDTO);
        const dbResult = await keywordServiceInstance.getKeywords(req);
        return res.status(201).json({keywords:dbResult});
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

};