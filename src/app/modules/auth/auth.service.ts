import httpStatus from 'http-status';
import { AppError } from '../../error/appError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

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
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
