import { Router } from 'express'
import { CourseController } from './course.controller'

const router = Router()

router.post('/create-course', CourseController.createCourse)

router.get('/single/:id', CourseController.getSingleCourse)

router.get('/get-all', CourseController.getAllCourses)

router.delete('/delete/:id', CourseController.deleteCourse)
