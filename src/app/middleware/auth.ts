
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import {AppError} from '../error/appError';
import jwt, {JwtPayload} from 'jsonwebtoken'
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
   const token = req.headers.authorization

  //  checking if token exists
    if(!token){
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    // checking valid token
    jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
      if(err){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      req.user = decoded as JwtPayload;
      next()
    });

})

}

export default auth;