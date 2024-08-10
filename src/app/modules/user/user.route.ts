import { Router } from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { studentValidations } from '../students/student.validation.zod'

const router = Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

export const userRoutes = router
