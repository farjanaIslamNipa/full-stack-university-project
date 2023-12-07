import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(StudentValidation.updateStudentValidationSchema),
 StudentControllers.updateStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
