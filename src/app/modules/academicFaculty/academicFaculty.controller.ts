import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { academicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const payload = req.body

  const result =
    await academicFacultyServices.createAcademicFacultyIntoDB(payload)

  sendResponse(res, {
    message: 'Successfully created Academic Faculty',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB()

  sendResponse(res, {
    message: 'Successfully Found All Academic Faculty',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id

  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDB(id)

  sendResponse(res, {
    message: 'Successfully Found Academic Faculty',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = req.body

  const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    payload,
  )

  sendResponse(res, {
    message: 'Successfully Updated Academic Faculty',
    data: result,
    statusCode: httpStatus.OK,
    success: true,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
