import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemisterServices } from './semester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Academic Semester Created Successfully',
    success: true,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllAcademicSemesterFromDB()

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Got All Academic Semesters',
    success: true,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id

  const result =
    await AcademicSemisterServices.getSingleAcademicSemesterFromDB(id)

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Got Single Academic Semesters',
    success: true,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await AcademicSemisterServices.updateAcademicSemesterIntoDB(
    id,
    req.body,
  )

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Successfully Updated Academic Semester',
    success: true,
  })
})

export const AcademicSemisterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
