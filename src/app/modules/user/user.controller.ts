/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express'
// import { studentValidations } from '../students/student.validation.zod'
import { userServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body
  // const zodParseData =
  //   studentValidations.createStudentValidationSchema.parse(student)
  const result = await userServices.createStudentToDb(password, studentData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
}
