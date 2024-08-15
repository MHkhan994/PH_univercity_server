import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { AdminServices } from './admin.services'
import catchAsync from '../../utils/catchAsync'

const getSingleAdmin = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await AdminServices.getSingleAdminFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived single admin successfully',
    data: result,
  })
})

const getAllAdmins = catchAsync(async (req, res) => {
  const query = req.query

  const result = await AdminServices.getAllAdminFromDB(query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived all admins successfully',
    data: result,
  })
})

export const AdminControllers = {
  getSingleAdmin,
  getAllAdmins,
}
