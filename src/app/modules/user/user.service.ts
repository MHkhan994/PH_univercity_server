import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemister } from '../academicSemester/semester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TAdmin } from '../admin/admin.interface'
import Admin from '../admin/admin.model'
import Faculty from '../faculty/faculty.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { TFaculty } from '../faculty/faculty.interface'

const createStudentToDb = async (password: string, studentData: TStudent) => {
  // create a user object
  const user: Partial<TUser> = {}

  user.password = password || (config.default_password as string)
  // set user role
  user.role = 'student'

  const admissionSemester = await AcademicSemister.findById(
    studentData.admissionSemester,
  )

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // set manually genenrated id
    user.id = await generateStudentId(admissionSemester)

    const newUser = await User.create([user], { session })

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
    }
    studentData.id = newUser[0].id
    studentData.user = newUser[0]._id

    const newStudent = await Student.create([studentData], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err) {
    // console.log(err)
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.CONFLICT, 'User already exist')
  }
}

const createAdminIntoDB = async (password: string, adminData: TAdmin) => {
  const user: Partial<TUser> = {}

  const exists = await Admin.findOne({ email: adminData.email })

  if (exists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin already exists')
  }

  user.password = password || (config.default_password as string)
  user.role = 'admin'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    user.id = await generateAdminId()

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not create user')
    }

    adminData.user = newUser[0]._id
    adminData.id = newUser[0].id

    const newAdmin = await Admin.create([adminData], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err)
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.CONFLICT, 'failed to create Admin')
    // throw new Error(err)
  }
}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'faculty'

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateFacultyId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const userServices = {
  createStudentToDb,
  createAdminIntoDB,
  createFacultyIntoDB,
}
