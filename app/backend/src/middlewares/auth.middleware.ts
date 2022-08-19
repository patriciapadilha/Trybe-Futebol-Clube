// import * as Jwt from 'jsonwebtoken';
// import { NextFunction, Request, Response } from 'express';
// import TokenGenerator from '../utils/tokenGenerator';

// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization || '';

//   const payload = TokenGenerator.authenticateToken(token);

//   // req.user = payload;

//   next();
// };

// export default authMiddleware;
