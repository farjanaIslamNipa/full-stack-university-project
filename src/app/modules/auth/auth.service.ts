import httpStatus from 'http-status';
import { AppError } from '../../error/appError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import {JwtPayload} from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt'
import {createToken, verifyToken} from './auth.utils';
import {sendEmail} from '../../utils/sendEmail';

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

const refreshToken = async (token: string) => {

    // checking valid token
    const decoded =  verifyToken(token, config.jwt_refresh_secret as string)

    const { userId, iat } = decoded
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

      return {
        accessToken,
      }

}

const forgetPassword = async(userId: string) => {

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

  // create token and send to the client
  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload, 
    config.jwt_access_secret as string, 
    '10m'
    );
  
  const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`

  sendEmail( user?.email, resetUILink)
}

const resetPassword = async(payload:{id: string, newPassword: string}, token: string) => {
  const user = await User.isUserExistsByCustomId(payload?.id);
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
   // checking valid token
   const decoded = verifyToken(token, config.jwt_access_secret as string)

    if(payload?.id !== decoded?.userId){
      throw new AppError(httpStatus.FORBIDDEN, 'User forbidden')
    }

  // hash new password
  const newHashedPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt_rounds))

  await User.findOneAndUpdate({
    id: decoded?.userId,
    role: decoded?.role
  },{
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date()
  })


}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
};
