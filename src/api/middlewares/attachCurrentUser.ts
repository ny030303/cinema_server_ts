import { Sequelize } from 'sequelize/types';
import { Container } from 'typedi';
// import mongoose from 'mongoose';
// import { IUser } from '@/interfaces/IUser';
import { Logger } from 'winston';
import User from '../../models/User';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger : Logger = Container.get('logger');
  try {
    if(!req.user) return res.sendStatus(401);

    const userModel = Container.get('userModel') as any;
    let userRecord = await userModel.findOne({where: {id: req.user.id}});
    if(userRecord) {
      console.log(userRecord.dataValues);
      const currentUser = JSON.parse(JSON.stringify(userRecord.dataValues));
      Reflect.deleteProperty(currentUser, 'pwd');
      req.currentUser = currentUser;
    } else {
      return res.sendStatus(401);
    }
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;