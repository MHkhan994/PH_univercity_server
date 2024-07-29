import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyControllers } from './academicFaculty.controller'

const router = Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)

router.get('/get-all', AcademicFacultyControllers.getAllAcademicFaculty)

router.get('/single/:id', AcademicFacultyControllers.getSingleAcademicFaculty)

router.patch(
  '/update/:id',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
)
