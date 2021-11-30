import { Model } from 'sequelize/types';
import { Container } from 'typedi';
// import mongoose from 'mongoose';
// import { IUser } from '@/interfaces/IUser';
import { Logger } from 'winston';
import { IUser } from '../../interfaces/IUser';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const isAuth = async (req, res, next) => {
  const Logger : Logger = Container.get('logger');
  try {
    // console.log(req.user);
    // const UserModel = Container.get('userModel') as Model<IUser>;
    // UserModel.findOne({where: {id: userId}});
    // const userRecord = await UserModel.findById(req.token._id);
    // if (!userRecord) {
    //   return res.sendStatus(401);
    // }
    // const currentUser = userRecord.toObject();
    // Reflect.deleteProperty(currentUser, 'password');
    // Reflect.deleteProperty(currentUser, 'salt');
    // req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default isAuth;