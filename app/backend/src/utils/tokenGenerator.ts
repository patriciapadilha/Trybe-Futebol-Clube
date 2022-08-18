import * as Jwt from 'jsonwebtoken';
import IJWT from '../interfaces/IJWT';
import HttpException from './http.exceptions';

const { JWT_SECRET } = process.env;

const configDefault: Jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

class TokenGenerator {
  private jwt = Jwt;
  constructor(private jwtConfig?: Jwt.SignOptions) {
    if (!jwtConfig) {
      this.jwtConfig = configDefault;
    }
  }

  public generateToken(payload: IJWT) {
    return this.jwt.sign(payload, JWT_SECRET as string, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'You dont have a token');
    }

    try {
      const verification = await this.jwt.verify(token, JWT_SECRET as string, this.jwtConfig);
      return verification;
    } catch (e) {
      throw new HttpException(401, 'Invalid token');
    }
  }
}

export default TokenGenerator;
