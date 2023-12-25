
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import {AppError} from '../error/appError';
import jwt, {JwtPayload} from 'jsonwebtoken'
import config from '../config';
import {TUserRole} from '../modules/users/user.interface';
import {User} from '../modules/users/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
   const token = req.headers.authorization

  //  checking if token exists
    if(!token){
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    // checking valid token
    const decoded =  jwt.verify(token, config.jwt_access_secret as string) as JwtPayload
    const { role, userId, iat } = decoded
    const user = await User.isUserExistsByCustomId(userId);
    // checking user
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
  
    // checking if user is deleted
    const isDeletedUser = user?.isDeleted;
  
    if (isDeletedUser) {
      throw new AppError(httpStatus.FORBIDDEN, 'User does not exists');
    }
  
    // // checking user status
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked');
    }

    if(user.passwordChangedAt && (User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number))){
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    if(requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    req.user = decoded as JwtPayload;
    next()

})

}

export default auth;