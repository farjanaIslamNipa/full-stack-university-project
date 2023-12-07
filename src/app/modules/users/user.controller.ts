import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

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

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin
}