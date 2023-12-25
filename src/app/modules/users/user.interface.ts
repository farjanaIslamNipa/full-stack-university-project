/* eslint-disable no-unused-vars */
import {Model} from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: 'admin'| 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted?: boolean;
}

export interface UserModel extends Model<TUser>{
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isDeletedUser(id: string): Promise<boolean>;
  userStatus(id: string):  Promise<string>;
  isPasswordMatched(plainPassword: string, hashedPassword: string) : Promise<boolean>;
}

