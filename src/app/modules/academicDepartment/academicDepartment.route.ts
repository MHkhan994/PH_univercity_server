import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'

const router = Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.get('/get-all', AcademicDepartmentControllers.getAllAcademicDepartment)

router.get(
  '/single/:id',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
)

router.patch(
  '/update/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
