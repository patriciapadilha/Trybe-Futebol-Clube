import * as Joi from 'joi';
import { compareSync } from 'bcryptjs';
import ILoginToken from '../interfaces/ILoginToken';
import HttpException from '../utils/http.exceptions';
import TokenGenerator from '../utils/tokenGenerator';
import User from '../database/models/User';

class LoginService {
  static async authentication(login: ILoginToken) {
    LoginService.validateLogin(login);

    const user = await User.findOne({
      where: { email: login.email },
    });

    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    if (user && compareSync(login.password, user.getDataValue('password'))) {
      const token = TokenGenerator.generateToken({
        email: login.email,
        password: login.password,
      });
      return { token };
    }
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
