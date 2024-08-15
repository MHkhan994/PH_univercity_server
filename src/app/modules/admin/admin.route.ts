import { Router } from 'express'
import { AdminControllers } from './admin.controller'

const router = Router()

router.get('/single/:id', AdminControllers.getSingleAdmin)

router.get('/get-all', AdminControllers.getAllAdmins)

export const AdminRoutes = router
