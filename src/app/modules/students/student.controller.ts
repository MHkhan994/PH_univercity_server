import { NextFunction, Request, Response } from 'express'
import { studentServices } from './student.service'

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentsFromDB()

    res.status(200).json({
      status: 'success',
      message: 'got all students',
      students: result,
    })
  } catch (err) {
    next(err)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id
  try {
    const result = await studentServices.getSingleStudentFromDB(id)
    res.status(200).json({
      status: 'success',
      message: 'got single student',
      students: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params
  try {
    const result = await studentServices.deleteStudentFromDB(id)
    res.status(200).json({
      status: 'success',
      message: 'got single student',
      students: result,
    })
  } catch (err) {
    next(err)
  }
}

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
