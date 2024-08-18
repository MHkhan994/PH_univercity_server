import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { searchableFields } from '../students/students.constants'
import Admin from './admin.model'
import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { TAdmin } from './admin.interface'

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
      deletedAdmin.user,
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

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...restOfUpdateData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...restOfUpdateData,
  }

  if (name && Object.keys(name).length !== 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  })

  return result
}

export const AdminServices = {
  getSingleAdminFromDB,
  getAllAdminFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB,
}
