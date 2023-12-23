import {Types} from "mongoose";

export type Days = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Thu' |'Wed' | 'Fri' ;

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: Days[];
  startTime: string;
  endTime: string;
}