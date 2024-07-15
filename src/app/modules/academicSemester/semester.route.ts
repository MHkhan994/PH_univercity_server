import { Router } from 'express'
import { AcademicSemisterControllers } from './semester.controller'

const router = Router()

router.post(
  '/create-semester',
  AcademicSemisterControllers.createAcademicSemester,
)

export const AcademicSemisterRoutes = router
