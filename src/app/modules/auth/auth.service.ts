import httpStatus from 'http-status';
import { AppError } from '../../error/appError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import jwt, {JwtPayload} from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt'
import {createToken} from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);
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

  // comparing password
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  // Access Granted: send access token and refresh token
  // create token and send to the client
  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload, 
    config.jwt_access_secret as string, 
    config.jwt_access_expires_in as string
    );

  const refreshToken = createToken(
    jwtPayload, 
    config.jwt_refresh_secret as string, 
    config.jwt_refresh_expires_in as string
    );


  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};


const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {

  const user = await User.isUserExistsByCustomId(userData.userId);
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

  // comparing password
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  // hash new password

  const newHashedPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt_rounds))

   await User.findOneAndUpdate({
    id: userData.userId,
    role: userData.role
  }, {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date()
  })

  return null;
}

export const AuthServices = {
  loginUser,
  changePassword
};
