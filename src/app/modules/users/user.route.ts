
import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from '../student/student.validation';
import { FacultyValidation } from '../faculty/faculty.validation';




const router = express.Router();



router.post(
  '/create-student', 
   validateRequest(StudentValidation.createStudentValidationSchema),
  UserControllers.createStudent)

  router.post(
    '/create-faculty',
    validateRequest(FacultyValidation.createFacultyValidationSchema),
    UserControllers.createFaculty
    )

export const UserRoutes = router; 