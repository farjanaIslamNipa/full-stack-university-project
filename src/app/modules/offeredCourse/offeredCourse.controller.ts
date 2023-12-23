import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {OfferedCourseServices} from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result
  })
})


const getOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getOfferedCourseFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered courses retrieved successfully',
    data: result
  })
})

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course retrieved successfully',
    data: result
  })
})


const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OfferedCourseServices.updateOfferedCourseFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course updated successfully',
    data: result
  })
})

export const OfferedCourseControllers = {
  createOfferedCourse,
  getOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse
}