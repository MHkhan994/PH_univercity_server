import express from 'express'
import { FacultyControllers } from './faculty.controller'
import { facultyValidations } from './faculty.validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()

router.get('/single/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/update/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.delete('/delete/:id', FacultyControllers.deleteFaculty)

router.get('/get-all', FacultyControllers.getAllFaculties)

export const FacultyRoutes = router
