import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { searchableFields } from '../students/students.constants'
import Admin from './admin.model'
import mongoose from 'mongoose'
import { User } from '../user/user.model'

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)

  return result
}

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.queryModel

  return result
}

const deleteAdminFromDB = async (id: string) => {
  const admin = await Admin.findById(id)

  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exist')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin')
    }

    const deletedUser = await User.findByIdAndUpdate(
      admin.user,
      {
        isDeleted: true,
      },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedAdmin
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin')
  }
}

export const AdminServices = {
  getSingleAdminFromDB,
  getAllAdminFromDB,
  deleteAdminFromDB,
}
