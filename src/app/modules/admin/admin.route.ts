import { Router } from 'express'
import { AdminControllers } from './admin.controller'
import validateRequest from '../../middleware/validateRequest'
import { AdminValidations } from './admin.validation'

const router = Router()

router.get('/single/:id', AdminControllers.getSingleAdmin)

router.get(
  '/get-all',
  validateRequest(AdminValidations.createAdminValidation),
  AdminControllers.getAllAdmins,
)

router.delete('/delete/:id', AdminControllers.deleteAdmin)

router.patch(
  '/update/:id',
  validateRequest(AdminValidations.updateAdminValidation),
  AdminControllers.updateAdmin,
)

router.delete('/delete/:id', AdminControllers.deleteAdmin)

export const AdminRoutes = router
