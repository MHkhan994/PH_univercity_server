import { Router } from 'express'
import { CourseController } from './course.controller'
import validateRequest from '../../middleware/validateRequest'
import CourseValidations from './course.validation'

const router = Router()

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
)

router.get('/single/:id', CourseController.getSingleCourse)

router.get('/get-all', CourseController.getAllCourses)

router.delete('/delete/:id', CourseController.deleteCourse)

export const CoursesRoutes = router
