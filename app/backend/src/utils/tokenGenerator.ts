import * as Jwt from 'jsonwebtoken';

import HttpException from './http.exceptions';
import 'dotenv/config';
import ILoginToken from '../interfaces/ILoginToken';

const { JWT_SECRET } = process.env;

class TokenGenerator {
  static generateToken(payload: ILoginToken) {
    const configDefault: Jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    return Jwt.sign(payload, JWT_SECRET as string, configDefault);
  }

  static authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'You dont have a token');
    }

    try {
      const verification = Jwt.verify(token, JWT_SECRET as string);
      return verification;
    } catch (e) {
      throw new HttpException(401, 'Invalid token');
    }
  }
}

export default TokenGenerator;
