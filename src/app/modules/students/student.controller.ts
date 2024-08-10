/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { studentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const getAllStudents: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await studentServices.getAllStudentsFromDB()
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'got all students',
      data: result,
    })
  },
)

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id

  const result = await studentServices.getSingleStudentFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'got single student',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const result = await studentServices.deleteStudentFromDB(id)
  res.status(200).json({
    status: 'success',
    message: 'successfully deleted student',
    students: result,
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body

  const result = await studentServices.updateStudentIntoDB(id, student)

  res.status(200).json({
    status: 'success',
    message: 'successfully updated student',
    students: result,
  })
})

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
