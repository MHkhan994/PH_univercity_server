import { Router } from 'express'
import { studentRoutes } from '../modules/students/student.route'
import { userRoutes } from '../modules/user/user.route'
import { AcademicSemisterRoutes } from '../modules/academicSemester/semester.route'

const router = Router()

const moduleRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/students', route: studentRoutes },
  { path: '/academic-semesters', route: AcademicSemisterRoutes },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
