import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AppError } from '../../error/appError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
});

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Department is already exists',
    );
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExists = await AcademicDepartment.findOne(query);

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist!');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
