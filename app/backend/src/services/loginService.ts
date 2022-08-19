import * as Joi from 'joi';
import { compareSync } from 'bcryptjs';
import ILoginToken from '../interfaces/ILoginToken';
import HttpException from '../utils/http.exceptions';
import TokenGenerator from '../utils/tokenGenerator';
import User from '../database/models/User';

class LoginService {
  static async authentication(login: ILoginToken): Promise<string> {
    LoginService.validateLogin(login);

    const user = await User.findOne({
      where: { email: login.email },
    });

    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    if (user && compareSync(login.password as string, user.getDataValue('password'))) {
      return TokenGenerator.generateToken({
        id: user.getDataValue('id'),
        email: login.email,
        role: user.getDataValue('role'),
      });
      // return { token };
    }
    throw new HttpException(401, 'Incorrect email or password');
  }

  static validateLogin(login: ILoginToken): void {
    const schemaLogin = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schemaLogin.validate(login);
    if (error) throw new HttpException(400, 'All fields must be filled');
  }
}

export default LoginService;
