
import express, {NextFunction, Request, Response} from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from '../student/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middleware/auth';
import {USER_ROLE} from './user.constant';
import {UserValidation} from './user.validation';
import {upload} from '../../utils/sendImageToCloudinary';




const router = express.Router();



router.post(
  '/create-student', 
  auth(USER_ROLE.admin), 
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  },
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

  router.post(
    '/change-status/:id',
    auth('admin'),
    validateRequest(UserValidation.changeStatusValidationSchema),
    UserControllers.changeStatus
  )



  router.get(
    '/me',
    auth('student', 'faculty', 'admin'), 
    UserControllers.getMe
  )

export const UserRoutes = router; 