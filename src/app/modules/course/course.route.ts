import express from 'express'
import { CourseControllers } from './course.controller'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidationSchema } from './course.validation'

const router = express.Router()

router.post(
  '/create-course', 
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse
  )
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
// router.patch('/:id', CourseControllers.)
router.delete('/:id', CourseControllers.deleteCourse)

 
export const CourseRoutes = router