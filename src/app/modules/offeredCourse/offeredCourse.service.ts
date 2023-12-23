import {TOfferedCourse} from "./offeredCourse.interface";
import {OfferedCourse} from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

  const result = await OfferedCourse.create(payload);

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