import config from '../../config'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentToDb = async (password: string, studentData: TStudent) => {
  // create a user object
  const user: Partial<TUser> = {}

  // if password is not given use default password
  user.password = password || (config.default_password as string)
  // set user role
  user.role = 'student'
  // set manually genenrated id
  user.id = '203010001'

  const newUser = await User.create(user)

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id

    console.log(studentData)

    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const userServices = {
  createStudentToDb,
}
