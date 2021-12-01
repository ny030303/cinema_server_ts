import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Container } from 'typedi';
const LocalStrategy = require('passport-local').Strategy;
import middlewares from '../../middlewares';
// import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import localFormDataUpload from '../../middlewares/localMulter';
import AuthService from '../../../services/auth';
import { IUserInputDTO } from '../../../interfaces/IUser';
import User from '../../../models/User';

const route = Router();
const authOpts = {
  local: {
    usernameField: 'id',
    passwordField: 'pwd',
    passReqToCallback: true
  },
  redirect: {
    successRedirect: '/api/users/me',
    failureRedirect: '/api/auth/failed',
    failureFlash: true
  },
};
export default (route: Router) => {
    const logger:Logger = Container.get('logger');
    passport.use('local', new LocalStrategy(authOpts.local, async (req, id, pwd, done) => {
        try {
            const authServiceInstance = Container.get(AuthService);
            const dbUserInfo = await authServiceInstance.localLogin(req.body as IUserInputDTO);
            if(dbUserInfo.constructor == User) done(null, dbUserInfo);
            else done(null, false, dbUserInfo);
        } catch (error) {
            logger.error('🔥 error: %o', error);
            done(error);
        }
    }));

    route.post('/local', localFormDataUpload.none(), passport.authenticate('local', authOpts.redirect));

    route.get('/failed', function (req, res, next) {
        logger.debug('-- Failed Log-In --');
        let text = req.flash();
        if(text.error) res.status(201).json({result: text.error[0]});
        else res.status(201).json({result: "로그인 실패 했습니다."});
    });
    
    route.get('/logout', (req, res, next) => {
        try {
            logger.debug('Calling Log-Out endpoint with body: %o', req.body);
            req.logout();
            req.session.save((err) => {
            if (err) throw err;
            res.status(201).json({result: "로그아웃 완료"});
            });
        } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
};