import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";

const facultySchema = new Schema({
  id: {type: String, required: true, unique: true},
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {type: String, required: true},
  gender: {type: String, enum: ['male', 'female', 'other'], required: true},
  dateOfBirth: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  contactNo: {type: Number, required: true},
  emergencyContactNo: {type: Number, required: true},
  presentAddress: {type: String, required: true},
  permanentAddress: {type: String, required: true},
  profileImage: {type: String, required: true},
  academicFaculty: {type: Schema.Types.ObjectId, ref: 'AcademicFaculty'},
  AcademicDepartment: {type: Schema.Types.ObjectId, ref: 'AcademicDepartment'},
  isDeleted: {type: Boolean, default: false}
},{timestamps: true})

export const Faculty = model<TFaculty>('Faculty', facultySchema)