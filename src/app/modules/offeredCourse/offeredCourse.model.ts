import {Schema, model} from "mongoose";
import {TOfferedCourse} from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCourse>({

})

export const OfferedCourse = model<TOfferedCourse>('TOfferedCourse', offeredCourseSchema)