import config from '../../config'
import { AcademicSemister } from '../academicSemester/semester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './users.utils'

const createStudentToDb = async (password: string, studentData: TStudent) => {
  // create a user object
  const user: Partial<TUser> = {}

  user.password = password || (config.default_password as string)
  // set user role
  user.role = 'student'

  const admissionSemester = await AcademicSemister.findById(
    studentData.admissionSemester,
  )

  // set manually genenrated id
  user.id = await generateStudentId(admissionSemester)

  const newUser = await User.create(user)

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id

    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const userServices = {
  createStudentToDb,
}
