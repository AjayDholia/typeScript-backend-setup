import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../Mongo/Config';

interface JwtPayload {
  _id: string;
  [key: string]: any; // Extend as needed based on your JWT payload
}

const validator = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ')[1];

    if (!token) {
      res.status(401).send({ success: false, msg: 'No token provided!' });
      return;
    }

    // Verify the token
    const verifiedData = jwt.verify(token, jwtConfig.JWT_PRIVATE_KEY) as JwtPayload;
    req.user = verifiedData;

    next();
  } catch (err: any) {
    res.status(400).send({ success: false, msg: 'Not Verified!', error: err.message || err });
  }
};

export { validator };
