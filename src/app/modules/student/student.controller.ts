import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB();
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All students get retrieved successfully',
      data: result
    })
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student get successfully',
      data: result
    })
});

const deleteStudent = catchAsync(async(req, res) => {
  const {studentId} = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result
    })
 
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
