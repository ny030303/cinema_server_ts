import { Request } from 'express';
import { Service, Inject } from 'typedi';
import { IUserInputDTO } from '../interfaces/IUser';
import User from '../models/User';

@Service()
export default class AuthService {
  @Inject('userModel') private userModel
  @Inject('logger') private logger

  // Promise<[MovieGenore]>
  public async localLogin(user: IUserInputDTO) {
    try {
      console.log(user);
      // this.logger.debug('User: ' + user);
      let dbUserInfo = await this.userModel.findOne({where: {id: user.id}});
      if (dbUserInfo) {
        let result = user.pwd == dbUserInfo.pwd; // pwd check
        if (result) return dbUserInfo;
        else return {message: '비밀번호가 일치하지 않습니다.'};
      }
      else return {message: '가입되지 않은 회원입니다.'};
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}