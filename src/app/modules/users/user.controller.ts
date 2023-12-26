import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import {AppError} from "../../error/appError";

const createStudent = catchAsync(async (req, res) => {

    const { password, student:studentData} = req.body;
    // calling service function to send data
    const result = await UserService.createStudentIntoDB(password, studentData);

    // sending data to client
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result
  })
});

const createFaculty = catchAsync(async(req, res) => {
  const {password, faculty} = req.body
  const result = await UserService.createFacultyIntoDB(password, faculty)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result
  })
});

const createAdmin = catchAsync(async(req, res) => {
  const { password } = req.body
  const result = await UserService.createAdminIntoDB(password, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result
  })
});

const getMe = catchAsync(async(req, res) => {
  const token = req.headers.authorization

  if(!token){
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
  }

  const result = await UserService.getMeFromDB(token)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result
  })
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe
}