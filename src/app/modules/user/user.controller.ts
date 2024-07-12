import { NextFunction, Request, Response } from 'express'
// import { studentValidations } from '../students/student.validation.zod'
import { userServices } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password, student: studentData } = req.body

  try {
    // const zodParseData =
    //   studentValidations.createStudentValidationSchema.parse(student)
    const result = await userServices.createStudentToDb(password, studentData)

    res.status(200).json({
      status: 'success',
      message: 'student create successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}
