import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyCreateValidation),
  AcademicFacultyControllers.createAcademicFaculty
)
router.get(
  '/',
  AcademicFacultyControllers.getAllAcademicFaculties
)
router.get(
  '/:facultyId',
  AcademicFacultyControllers.getSingleAcademicFaculty
)
router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyValidation.academicFacultyUpdateValidation),
  AcademicFacultyControllers.updateAcademicFaculty
)

export const AcademicFacultyRoutes = router;