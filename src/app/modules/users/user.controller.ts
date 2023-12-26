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
  const {userId, role} = req.user
  const result = await UserService.getMeFromDB(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result
  })
});

const changeStatus = catchAsync(async(req, res) => {
  const id = req.params.id
  const result = await UserService.changeStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status changed successfully',
    data: result
  })
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
}