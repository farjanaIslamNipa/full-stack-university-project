import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, { message: 'First name must be at least 1 character long' })
    .max(20, { message: 'First name cannot be longer than 20 characters' }),
  middleName: z.string().trim().optional(),
  lastName: z.string()
    .trim()
    .min(1, { message: 'Last name must be at least 1 character long' }),
});

// Define Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name must be at least 1 character long" }),
  fatherOccupation: z.string().min(1, { message: "Father's occupation must be at least 1 character long" }),
  fatherContactNo: z.string().trim().min(1, { message: "Father's contact number must be at least 1 character long" }),
  motherName: z.string().min(1, { message: "Mother's name must be at least 1 character long" }),
  motherOccupation: z.string().min(1, { message: "Mother's occupation must be at least 1 character long" }),
  motherContactNo: z.string().trim().min(1, { message: "Mother's contact number must be at least 1 character long" }),
});

// Define Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name must be at least 1 character long' }),
  occupation: z.string().min(1, { message: 'Local guardian occupation must be at least 1 character long' }),
  contactNo: z.string().trim().min(1, { message: 'Local guardian contact number must be at least 1 character long' }),
  address: z.string().min(1, { message: 'Local guardian address must be at least 1 character long' }),
});

// Define Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }),
    contactNo: z.string().min(1, { message: 'Contact number must be at least 1 character long' }),
    emergencyContactNo: z.string().trim().min(1, { message: 'Emergency contact number must be at least 1 character long' }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
    presentAddress: z.string().min(1, { message: 'Present address must be at least 1 character long' }),
    permanentAddress: z.string().min(1, { message: 'Permanent address must be at least 1 character long' }),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    admissionSemester: z.string(),
    profileImg: z.string().optional(),

    })
  })
});

export const studentValidations = {
  createStudentValidationSchema,
};