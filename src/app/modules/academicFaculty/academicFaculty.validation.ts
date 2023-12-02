import { z } from "zod";

const academicFacultyCreateValidation = z.object({
  body: z.object({
    name: z.string({  required_error: "Faculty name required",invalid_type_error: 'Academic faculty must be a string'})
  })
})

const academicFacultyUpdateValidation = z.object({
  body: z.object({
    name: z.string({invalid_type_error: 'Academic faculty must be a string'}).optional()
  })
})

export const AcademicFacultyValidation = {
  academicFacultyCreateValidation,
  academicFacultyUpdateValidation
}