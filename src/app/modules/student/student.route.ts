import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentValidationSchema),
 StudentControllers.updateStudent);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
