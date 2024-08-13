import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  let searchTerm: string = ''
  const queryObj = { ...query }

  const searchableFields = ['email', 'name.firstName', 'presentAddress']

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }

  const searchQuery = Student.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  const excludeFields: string[] = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'fields',
  ]

  excludeFields.forEach((el) => delete queryObj[el])

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  let sort = 'createdAt'

  if (query.sort) {
    sort = query.sort as string
  }

  const sortQuery = filterQuery.sort(sort)

  let page = 1
  let skip = 0
  let limit = 1
  let fields = '-_v'

  if (query.limit) {
    limit = Number(query.limit) as number
  }

  if (query.page) {
    page = Number(query.page)
    skip = Number(page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip)

  const limitQuery = paginateQuery.limit(limit)

  // field limiting
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ')
  }

  const fieldQuery = await limitQuery.select(fields)

  return fieldQuery
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    // console.log(err)
    await session.abortTransaction()
    await session.endSession()

    throw new Error('Failed to delete student')
  }
}

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
}
