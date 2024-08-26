import express from 'express'
import { SemesterRegistrationController } from './semesterRegistration.controller'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
)

router.get(
  '/single/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
)

router.patch(
  '/update/:id',
  validateRequest(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
)

router.delete('/:id', SemesterRegistrationController.deleteSemesterRegistration)

router.get(
  '/get-all',
  SemesterRegistrationController.getAllSemesterRegistrations,
)

export const semesterRegistrationRoutes = router
