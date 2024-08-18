import { Router } from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { studentValidations } from '../students/student.validation.zod'
import { AdminValidations } from '../admin/admin.validation'
import { facultyValidations } from '../faculty/faculty.validation'

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

router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
)

export const userRoutes = router
