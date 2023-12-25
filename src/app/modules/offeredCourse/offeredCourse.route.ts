import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import {OfferedCourseValidation} from './offeredCourse.validation';
import {OfferedCourseControllers} from './offeredCourse.controller';

const router = express.Router()

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
)

router.get('/', OfferedCourseControllers.getOfferedCourse)
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse)

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
)

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse)

export const OfferedCourseRouter = router;