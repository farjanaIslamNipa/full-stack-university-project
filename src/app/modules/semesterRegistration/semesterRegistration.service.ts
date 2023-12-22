import httpStatus from "http-status";
import {AppError} from "../../error/appEror";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
import {TSemesterRegistration} from "./semesterRegistration.interface"
import {SemesterRegistration} from "./semesterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester

  // checking if semester is 
  if(academicSemester){
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)

    if(!isAcademicSemesterExists){
      throw new AppError(httpStatus.NOT_FOUND, 'This academic semester does not exist')
    }
  }
  
  // checking if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})

  if(isSemesterRegistrationExists){
    throw new AppError(httpStatus.CONFLICT, 'This semester is already exist')
  }

  const result = await SemesterRegistration.create(payload);

  return result
}

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {

  const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query)
  .filter()
  .sort()
  .paginate()
  .fields()

  const result = await semesterRegistrationQuery.modelQuery

  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id)

  return result
}

const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload)

  return result
}

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB
}