import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemister } from '../academicSemester/semester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './users.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

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
    await session.abortTransaction()
    await session.endSession()
    console.log(err)
    throw new AppError(httpStatus.CONFLICT, 'User already exist')
    // return err
  }
}

export const userServices = {
  createStudentToDb,
}
