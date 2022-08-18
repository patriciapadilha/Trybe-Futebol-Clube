import * as Joi from 'joi';
import { compareSync } from 'bcryptjs';
import ILoginToken from '../interfaces/ILoginToken';
import sequelize from '../database/models';
import HttpException from '../utils/http.exceptions';
import IJWT from '../interfaces/IJWT';
import TokenGenerator from '../utils/tokenGenerator';

class LoginService {
  private tokenGenerator = new TokenGenerator();

  public async authentication(login: ILoginToken) {
    LoginService.validateLogin(login);

    const user = await sequelize.models.User.findOne({
      where: { email: login.email, password: login.password },
    });

    if (!user) {
      throw new HttpException(401, 'username or password is invalid');
    }

    if (user && compareSync(login.password, user.getDataValue('password'))) {
      const jwtHeader: IJWT = {
        username: user.getDataValue('username'),
        role: user.getDataValue('role'),
        email: user.getDataValue('email'),
      };

      const token = this.tokenGenerator.generateToken(jwtHeader);
      return { token };
    }
  }

  static validateLogin(login: ILoginToken): void {
    const schemaLogin = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schemaLogin.validate(login);
    if (error) throw new HttpException(400, 'All fields must be filded');
  }
}

export default LoginService;
