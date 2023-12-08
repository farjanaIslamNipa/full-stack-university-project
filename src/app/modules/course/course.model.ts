import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
   course:{type: Schema.Types.ObjectId,},
   isDeleted: {type: Boolean, default: false}
})

const courseSchema = new Schema<TCourse>({
  title: {type: String, required: true, unique: true},
  prefix: {type: String, required: true, trim: true},
  code: {type: Number, required: true},
  credits: {type: Number, required: true},
  preRequisiteCourses: [preRequisiteCoursesSchema]
})

export const Course =  model<TCourse>('Course', courseSchema)