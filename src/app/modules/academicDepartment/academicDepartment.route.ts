import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = Router();

router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidation),
  AcademicDepartmentControllers.createAcademicDepartment
)

router.get(
  '/',
  AcademicDepartmentControllers.getAllAcademicDepartments
)

router.get(
  '/:id',
  AcademicDepartmentControllers.getSingleAcademicDepart
)

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidation),
  AcademicDepartmentControllers.updateAcademicDepartment
)

export const AcademicDepartmentRoutes = router;