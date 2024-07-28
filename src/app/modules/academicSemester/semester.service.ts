import { ObjectId } from 'mongodb'
import { TAcademicSemester } from './semester.interface'
import { AcademicSemister } from './semester.model'
import { academicSemesterNameCodeMapper } from './semester.variables'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemister.create(payload)
  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemister.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemister.findOne({ _id: new ObjectId(id) })
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemisterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
