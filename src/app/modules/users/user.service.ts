/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import { AppError } from "../../error/appEror";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";



const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession()

  try{
    session.startTransaction()
  //set manually generated if
  userData.id = await generateStudentId(admissionSemester)

  //create user(transaction -1)
  const newUser = await User.create([userData], {session})

  //create student
  if(!newUser.length){

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
  }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id


    // create student(transaction-2)

    const newStudent = await Student.create([payload], {session})

    if(!newStudent.length){

      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent;

  }catch(err: any){
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }

};

const createFacultyIntoDB = async(payload: TFaculty) => {
  const result = await Faculty.create(payload);

  return result;
}

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB
}
