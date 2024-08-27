import express from 'express'
import { OfferedCourseControllers } from './OfferedCourse..controller'
import validateRequest from '../../middleware/validateRequest'
import { OfferedCourseValidations } from './OfferedCourse.validation'

const router = express.Router()

router.get('/get-all', OfferedCourseControllers.getAllOfferedCourses)

// router.get('/my-offered-courses', OfferedCourseControllers.getMyOfferedCourses)

router.get('/single/:id', OfferedCourseControllers.getSingleOfferedCourses)

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
)

router.patch(
  '/update/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
)

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB)

export const offeredCourseRoutes = router
