import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from '../students/students.constants'
import Admin from './admin.model'
import { User } from '../user/user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

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
  
  const session = await mongoose.startSession()

  try {
    
    session.startTransaction()

    const deletedAdmin = await Admin.findByIdAndUpdate( id , { isDeleted: true }, { new: true, session })

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin')
    }

    const deletedUser = await User.findByIdAndUpdate(deletedAdmin.user, {isDeleted: true}, {new: true, session})

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
  deleteAdminFromDB
}
