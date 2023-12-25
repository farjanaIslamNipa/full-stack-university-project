import httpStatus from "http-status";
import {AppError} from "../../error/appEror";
import {SemesterRegistration} from "../semesterRegistration/semesterRegistration.model";
import {TOfferedCourse} from "./offeredCourse.interface";
import {OfferedCourse} from "./offeredCourse.model";
import {AcademicFaculty} from "../academicFaculty/academicFaculty.model";
import {AcademicDepartment} from "../academicDepartment/academicDepartment.model";
import {Course} from "../course/course.model";
import {Faculty} from "../faculty/faculty.model";
import {hasTimeConflict} from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration, 
    academicFaculty, 
    academicDepartment, 
    course, 
    faculty, 
    section,
    days,
    startTime,
    endTime
  } = payload;
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

  // Faculty
  const isFacultyExists = await Faculty.findById(faculty);

  if(!isFacultyExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found')
  }

  // check if the department belongs to the faculty
  const ifDepartmentBelongToFaculty = await AcademicDepartment.findOne({_id:academicDepartment, academicFaculty})
  if(!ifDepartmentBelongToFaculty){
    throw new AppError(httpStatus.NOT_FOUND, `This ${isAcademicDepartmentExists.name} does not belongs to ${isAcademicFacultyExists.name} faculty`)
  }

  // check if the same offered course in same section
  const isSameOfferedCourseExistsWithSameSection = await OfferedCourse.findOne({semesterRegistration, course, section})

  if(isSameOfferedCourseExistsWithSameSection){
    throw new AppError(httpStatus.BAD_REQUEST, 'Offered course with same section is already exists')
  }

  // getting schedule of faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in: days}
  }).select('days startTime endTime')
 
  const newSchedule = {
    days,
    startTime,
    endTime
  }

  if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new AppError(
    httpStatus.CONFLICT, 
    'This faculty is not available at that time ! choose another date time')
  }

  const result = await OfferedCourse.create({...payload, academicSemester});

  return result;
}


// GET ALL OFFERED COURSES
const getOfferedCourseFromDB = async (query: Record<string, unknown>) => {

  const result = await OfferedCourse.find(query);

  return result;
}


// GET SINGLE OFFERED COURSES
const getSingleOfferedCourseFromDB = async (id: string) => {

  const result = await OfferedCourse.findById(id);

  return result;
}



// UPDATE OFFERED COURSES
const updateOfferedCourseFromDB = async (id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>) => {

  const { faculty, days, startTime, endTime } = payload;

  // Checking if offered course exists
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if(!isOfferedCourseExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found')
  }

  // Checking if faculty exists
  const isFacultyExists = await Faculty.findById(id);

  if(!isFacultyExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found')
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)

  if(semesterRegistrationStatus?.status !== 'UPCOMING'){
    throw new AppError(httpStatus.NOT_FOUND, `You cannot update this offered course as it is ${semesterRegistrationStatus?.status}`)
  }
  // getting schedule of faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in: days}
  }).select('days startTime endTime')
 
  const newSchedule = {
    days,
    startTime,
    endTime
  }

  if(hasTimeConflict(assignedSchedules, newSchedule)){
    throw new AppError(
    httpStatus.CONFLICT, 
    'This faculty is not available at that time ! choose another date time')
  }

  const result = await OfferedCourse.findByIdAndUpdate(
    id, 
    payload, 
    {
      new: true, 
      runValidators: true
    });

  return result;
}

const deleteOfferedCourseFromDB = async (id: string) => {

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if(!isOfferedCourseExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found')
  }
  
  const semesterRegistration = isOfferedCourseExists?.semesterRegistration;

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)

  if(semesterRegistrationStatus?.status !== 'UPCOMING'){
    throw new AppError(httpStatus.NOT_FOUND, `You cannot update this offered course as it is ${semesterRegistrationStatus?.status}`)
  }

  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseFromDB,
  deleteOfferedCourseFromDB
}