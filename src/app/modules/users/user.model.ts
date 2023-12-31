import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, UserModel>({
  id: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: 0},
  needsPasswordChange: {type: Boolean, default: true},
  passwordChangedAt: {type: Date},
  role: {type: String, enum: ['student', 'faculty', 'admin'], required: true},
  status: {type: String, enum: ['in-progress', 'blocked'], default: 'in-progress', required: true},
  isDeleted: {type: Boolean, default:false}
}, {timestamps: true});

userSchema.pre('save', async function(next){

  //eslint-disable-next-line
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
next()
})

userSchema.post('save', function(doc, next){
  doc.password = '';
  next()
})

userSchema.statics.isUserExistsByCustomId = async function(id: string){
  return await User.findOne({id}).select('+password')
}

userSchema.statics.isPasswordMatched = async function(plainPassword: string, hashedPassword: string){
  return (await bcrypt.compare(plainPassword, hashedPassword))
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function(
  passwordChangedTimestamp: Date, 
  jwtIssuedTimestamp: number
){
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime()/1000;
  return passwordChangedTime > jwtIssuedTimestamp;
}

export const User = model<TUser, UserModel>('User', userSchema)