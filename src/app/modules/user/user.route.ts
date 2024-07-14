import { Router } from 'express'
import { UserControllers } from './user.controller'
import { createStudentValidationSchema } from '../students/student.validation.zod'
import validateRequest from '../../middleware/validateRequest'

const router = Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
)

export const userRoutes = router
