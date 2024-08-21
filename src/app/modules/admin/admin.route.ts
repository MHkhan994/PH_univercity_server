import { Router } from 'express'
import { AdminControllers } from './admin.controller'

const router = Router()

router.get('/single/:id', AdminControllers.getSingleAdmin)

router.get('/get-all', AdminControllers.getAllAdmins)

router.delete('/delete/:id', AdminControllers.deleteAdmin)

export const AdminRoutes = router
