import httpStatus from "http-status";
import {AppError} from "../../error/appEror";
import {AcademicSemester} from "../academicSemester/academicSemester.model";
import {TSemesterRegistration} from "./semesterRegistration.interface"
import {SemesterRegistration} from "./semesterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder";
import {RegistrationStatus} from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester

  // check if a semester is ongoing or upcoming
  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [{status: RegistrationStatus.UPCOMING}, {status: RegistrationStatus.ONGOING}]
  })

  if(isThereAnyUpcomingOrOngoingSemester){
    throw new AppError(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`)
  }

  // checking if academic semester is exists
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
    // checking if registered semester is exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id)

    if(!isSemesterRegistrationExists){
      throw new AppError(httpStatus.CONFLICT, 'This semester is not found')
    }
  

    // IF requested semester status is ended that will not be updated
    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;

    if(currentSemesterStatus === RegistrationStatus.ENDED){
      throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`)
    }

    if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED){
      throw new AppError(
        httpStatus.BAD_REQUEST, 
        `You cannot directly change status from ${currentSemesterStatus} to ${requestedStatus}`
        )
    }
    if(currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING){
      throw new AppError(
        httpStatus.BAD_REQUEST, 
        `You cannot directly change status from ${currentSemesterStatus} to ${requestedStatus}`
        )
    }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {new: true, runValidators:true})

  return result
}

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB
}