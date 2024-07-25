import { Router } from 'express'
import { AcademicSemisterControllers } from './semester.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemisterValidations } from './semester.validation'

const router = Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemisterValidations.createSemesterValidationSchema),
  AcademicSemisterControllers.createAcademicSemester,
)

router.get('/getAll', AcademicSemisterControllers.getAllAcademicSemester)

router.get('/single/:id', AcademicSemisterControllers.getSingleAcademicSemester)

router.patch(
  '/update/:id',
  validateRequest(AcademicSemisterValidations.updateSemesterValidationSchema),
  AcademicSemisterControllers.updateAcademicSemester,
)

export const AcademicSemisterRoutes = router
