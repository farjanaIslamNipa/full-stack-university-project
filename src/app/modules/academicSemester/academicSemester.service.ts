import httpStatus from "http-status";
import { AppError } from "../../error/appEror";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

  if(academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code')
  }
  const result = await AcademicSemester.create(payload);
  return result;

}

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find()
  return result;
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result
}

const updateAcademicSemesterIntoDB = async(id: string, payload: Partial<TAcademicSemester>) => {
  if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new AppError (httpStatus.NOT_FOUND, 'Invalid academic semester code')
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {new: true})
  return result;
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB
}