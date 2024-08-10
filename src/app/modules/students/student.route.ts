import express from 'express'
import { studentControllers } from './student.controller'
import validateRequest from '../../middleware/validateRequest'
import { studentValidations } from './student.validation.zod'

const router = express.Router()

router.get('/getAll', studentControllers.getAllStudents)

router.get('/single/:id', studentControllers.getSingleStudent)

router.delete('/:id', studentControllers.deleteStudent)

router.patch(
  '/update/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
)

export const studentRoutes = router
