import { z } from "zod";

const createAcademicDepartmentValidation = z.object({
  body: z.object(
    {
      name: z.string({invalid_type_error: 'Academic Department must be string', required_error: 'Academic Department field required'}),
      academicFaculty: z.string({invalid_type_error: 'Academic faculty must be string', required_error: 'Academic faculty is required'})
    }
  )
})
const updateAcademicDepartmentValidation = z.object({
  body: z.object(
    {
      name: z.string({invalid_type_error: 'Academic Department must be string', required_error: 'Academic Department field required'}).optional(),
      academicFaculty: z.string({invalid_type_error: 'Academic faculty must be string', required_error: 'Academic faculty is required'}).optional()
    }
  )
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation
}