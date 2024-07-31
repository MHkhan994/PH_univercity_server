import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { academicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res) => {
  const payload = req.body

  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(payload)

  sendResponse(res, {
    message: 'Successfully created Academic Department',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentFromDB()

  sendResponse(res, {
    message: 'Successfully Found All Academic Department',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id

  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(id)

  sendResponse(res, {
    message: 'Successfully Found Academic Department',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = req.body

  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDB(id, payload)

  sendResponse(res, {
    message: 'Successfully Updated Academic Department',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
