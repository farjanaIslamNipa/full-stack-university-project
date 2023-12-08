import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async(req, res)=> {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result
  })
})

const getAllAcademicSemester = catchAsync(async(req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all academic semester successfully',
    data: result
  })
})

const getSingleAcademicSemester = catchAsync(async(req, res) => {
  const { id } = req.params
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester found successfully',
    data: result
  })
})

const updateAcademicSemester = catchAsync(async(req, res) => {
  const { id } = req.params
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester updated successfully',
    data: result
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}