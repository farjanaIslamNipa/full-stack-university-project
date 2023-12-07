import { Types } from "mongoose";

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}

