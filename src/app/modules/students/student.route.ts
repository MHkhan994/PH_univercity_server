import express from 'express'
import { studentControllers } from './student.controller'

const router = express.Router()

router.get('/getAll', studentControllers.getAllStudents)

router.get('/single/:id', studentControllers.getSingleStudent)

export const studentRoutes = router
