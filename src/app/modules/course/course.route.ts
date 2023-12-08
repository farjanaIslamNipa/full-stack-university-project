import express from 'express'
import { CourseControllers } from './course.controller'

const router = express.Router()

router.post('/create-post', CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
// router.patch('/:id', CourseControllers.)
router.delete('/:id', CourseControllers.deleteCourse)


export const CourseRoutes = router