import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>({
  id: {type: String, required: true, unique: true},
  password: {type: String},
  needsPasswordChange: {type: Boolean, default: true},
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

export const User = model<TUser>('User', userSchema)