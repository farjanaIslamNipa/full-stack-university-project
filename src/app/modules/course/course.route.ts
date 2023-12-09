import express from 'express'
import { CourseControllers } from './course.controller'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidations } from './course.validation'

const router = express.Router()

router.post(
  '/create-course', 
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
  )
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse)
router.delete('/:id', CourseControllers.deleteCourse)
router.put('/:courseId/assign-faculties', 
validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
CourseControllers.assignFacultiesWithCourse)
router.delete('/:courseId/remove-faculties', 
validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
CourseControllers.removeFacultiesFromCourse)

 
export const CourseRoutes = router