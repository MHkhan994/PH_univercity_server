import { TStudent } from './student.interface'
import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
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

const updateStudentToDB = async (id: string, data: TStudent) => {
  const result = await Student.updateOne({ id }, data)
  return result
}

const deleteStudentFromDB = async (id: string) => {
  console.log(id)
  // try {
  //   const deletedStudent = await Student.findByIdAndUpdate(
  //     id,
  //     { isDeleted: true }
  //   );
  //   // get user _id from deletedStudent
  //   const userId = deletedStudent.user;
  //   const deletedUser = await User.findByIdAndUpdate(
  //     userId,
  //     { isDeleted: true },
  //   );
  //   return deletedStudent;
  // } catch (err) {
  //   throw new Error('Failed to delete student');
  // }
}

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentToDB,
  deleteStudentFromDB,
}
