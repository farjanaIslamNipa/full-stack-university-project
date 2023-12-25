import httpStatus from "http-status";
import {AppError} from "../../error/appEror";
import {User} from "../users/user.model";
import {TLoginUser} from "./auth.interface";

const loginUser = async(payload: TLoginUser) => {

  const user = await User.isUserExistsByCustomId(payload.id)
  // checking user
  if(!user){
    throw new AppError(
      httpStatus.NOT_FOUND, 
      'User not found'
    )
  }

  // checking if user is deleted
  if(await User.isDeletedUser(user.id)){
    throw new AppError(
      httpStatus.FORBIDDEN, 
      'User does not exists'
    )
  }

  // // checking user status

  if((await User.userStatus(user.id)) === 'blocked'){
    throw new AppError(
      httpStatus.NOT_FOUND, 
      'This user is blocked'
    )
  }

  // comparing password
  if(!(await User.isPasswordMatched(payload?.password, user?.password))){
    throw new AppError(
      httpStatus.FORBIDDEN, 
      'Password does not match'
    )
  }

  // Access Granted: send access token and refresh token


}

export const AuthServices = {
  loginUser,
}