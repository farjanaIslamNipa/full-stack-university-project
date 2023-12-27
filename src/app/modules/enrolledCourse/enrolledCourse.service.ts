import {TEnrolledCourse} from "./enrolledCourse.interface";
import {EnrolledCourse} from "./enrolledCourse.model"

const createEnrolledCourseIntoDB = async(userId: string, payload:TEnrolledCourse) => {

  /*
  *step1: check if the offered course exists
  *step2: check if the student is already enrolled
  *step3: create enrolled course
  */

  const result = await EnrolledCourse.create(userId, payload);

  return result;
}

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB
}