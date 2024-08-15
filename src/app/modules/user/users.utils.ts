import { TAcademicSemester } from '../academicSemester/semester.interface'
import { User } from './user.model'

export const findLastUserId = async (role: string) => {
  const lastStudent = await User.findOne({
    role: role,
  })
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester | null) => {
  // first time first student
  let currentId = (0).toString()

  const lastStudentId = await findLastUserId('student')

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
  const lastStudentYear = lastStudentId?.substring(0, 4)
  const currentSemesterCode = payload?.code
  const currentYear = payload?.year

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  incrementId = `${payload?.year}${payload?.code}${incrementId}`

  return incrementId
}

export const generateAdminId = async () => {
  let currentId = (0).toString()

  const lastAdminId = await findLastUserId('admin')

  if (lastAdminId) {
    currentId = lastAdminId.substring(2)
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  return `A-${incrementId}`
}

export const generateFacultyId = async () => {
  let currentId = (0).toString()

  const lastAdminId = await findLastUserId('faculty')

  if (lastAdminId) {
    currentId = lastAdminId.substring(2)
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  return `F-${incrementId}`
}
