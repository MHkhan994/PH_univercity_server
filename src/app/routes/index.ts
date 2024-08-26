import { Router } from 'express'
import { studentRoutes } from '../modules/students/student.route'
import { userRoutes } from '../modules/user/user.route'
import { AcademicSemisterRoutes } from '../modules/academicSemester/semester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { CoursesRoutes } from '../modules/course/course.route'
import { semesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.route'

const router = Router()

const moduleRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/students', route: studentRoutes },
  { path: '/admins', route: AdminRoutes },
  { path: '/academic-semesters', route: AcademicSemisterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/academic-departments', route: AcademicDepartmentRoutes },
  { path: '/faculties', route: FacultyRoutes },
  { path: '/courses', route: CoursesRoutes },
  { path: '/semester-registrations', route: semesterRegistrationRoutes },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
