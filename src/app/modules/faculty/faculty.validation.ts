import { z } from "zod";

const createFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
    name: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string(),
    email: z.string().email({message: 'Invalid email format'}),
    contactNo: z.string(),
    emergencyContactNo:z.string(),
    presentAddress:z.string(),
    permanentAddress:z.string(),
    profileImage:z.string(),
    academicFaculty:z.string(),
    academicDepartment:z.string(),
    isDeleted: z.boolean().default(false)
    })
  })
})
const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: z.string().optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({message: 'Invalid email format'}).optional(),
      contactNo: z.string().optional(),
      emergencyContactNo:z.string().optional(),
      presentAddress:z.string().optional(),
      permanentAddress:z.string().optional(),
      profileImage:z.string().optional(),
      academicFaculty:z.string().optional(),
      academicDepartment:z.string().optional(),
      isDeleted: z.boolean().default(false).optional()
    })
  })
})

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema
}