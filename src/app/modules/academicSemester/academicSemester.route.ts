import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester 
)

router.get(
  '/',
  AcademicSemesterControllers.getAllAcademicSemester
)

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester
)

router.patch(
  '/:semesterId',
  validateRequest(academicSemesterValidation.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester
  )


export const AcademicSemesterRoutes = router;