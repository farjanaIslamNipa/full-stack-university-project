
import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from '../student/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import {USER_ROLE} from './user.constant';




const router = express.Router();



router.post(
  '/create-student', 
  auth(USER_ROLE.admin), 
   validateRequest(StudentValidation.createStudentValidationSchema),
  UserControllers.createStudent)

  router.post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    UserControllers.createFaculty
    )

  router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin
  )

export const UserRoutes = router; 