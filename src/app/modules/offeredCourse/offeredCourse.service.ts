import httpStatus from "http-status";
import {AppError} from "../../error/appEror";
import {SemesterRegistration} from "../semesterRegistration/semesterRegistration.model";
import {TOfferedCourse} from "./offeredCourse.interface";
import {OfferedCourse} from "./offeredCourse.model";
import {AcademicFaculty} from "../academicFaculty/academicFaculty.model";
import {AcademicDepartment} from "../academicDepartment/academicDepartment.model";
import {Course} from "../course/course.model";
import {Faculty} from "../faculty/faculty.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload;
  // check if the semester registration id is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);

  if(!isSemesterRegistrationExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found')
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  // Academic faculty
  const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);

  if(!isAcademicFacultyExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found')
  }

  // Academic department
  const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);

  if(!isAcademicDepartmentExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found')
  }

  // Course
  const isCourseExists = await Course.findById(course);

  if(!isCourseExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
  }

  // Course
  const isFacultyExists = await Faculty.findById(faculty);

  if(!isFacultyExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found')
  }


  const result = await OfferedCourse.create({...payload, academicSemester});

  return result;
}


const getOfferedCourseFromDB = async (query: Record<string, unknown>) => {

  const result = await OfferedCourse.find(query);

  return result;
}


const getSingleOfferedCourseFromDB = async (id: string) => {

  const result = await OfferedCourse.findById(id);

  return result;
}


const updateOfferedCourseFromDB = async (id: string, payload: Partial<TOfferedCourse>) => {

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {new: true, runValidators: true});

  return result;
}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseFromDB
}