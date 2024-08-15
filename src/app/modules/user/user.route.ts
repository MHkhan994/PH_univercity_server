import { Router } from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { studentValidations } from '../students/student.validation.zod'
import { AdminValidations } from '../admin/admin.validation'

const router = Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidation),
  UserControllers.createAdmin,
)

export const userRoutes = router
