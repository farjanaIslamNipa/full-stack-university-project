import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./AcademicDepartment.controller";

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
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepart
)

router.patch(
  '/:departmentId',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidation),
  AcademicDepartmentControllers.updateAcademicDepartment
)

export const AcademicDepartmentRoutes = router;