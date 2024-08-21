import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { CourseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created course successfull',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CourseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived course successfull',
    data: result,
  })
})

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived all courses successfull',
    data: result,
  })
})
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CourseServices.deleteCourseIntoDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted course successfull',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await CourseServices.updateCourseIntoDB(id, payload)

    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated course successfull',
    data: result,
  })
})

export const CourseController = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  updateCourse
}
