import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constant'
import { TCourse, TCourseFaculty } from './course.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { Course, CourseFaculty } from './course.model'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.queryModel.populate([
    {
      path: 'preRequisitCourses.course',
      select: '-_id -__v',
    },
  ])

  return result
}

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate([
    {
      path: 'preRequisitCourses.course',
      select: '-__v',
    },
  ])
  return result
}

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )

  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisitCourses, ...remainingUpdateData } = payload

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // spep 1 basic course info update

    try {
      await Course.findByIdAndUpdate(id, remainingUpdateData, {
        new: true,
        runValidators: true,
        session,
      })
    } catch (err) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
    }

    if (preRequisitCourses && preRequisitCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisitslist = preRequisitCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)

      try {
        await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisitCourses: { course: { $in: deletedPreRequisitslist } },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
      } catch (err) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete preRecuisits',
        )
      }

      const newPreRequisits = preRequisitCourses?.filter(
        (el) => el.course && !el.isDeleted,
      )

      try {
        await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: { preRequisitCourses: { $each: newPreRequisits } },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
      } catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add preRecuisits')
      }
    }

    await session.commitTransaction()
    await session.endSession()

    const result = await Course.findById(id).populate(
      'preRequisitCourses.course',
    )

    return result
  } catch (err) {
    console.log(err)
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
  }
}

const assignCourseFaculitesIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  )

  return result
}
const removeCourseFaculitesFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  )

  return result
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseIntoDB,
  updateCourseIntoDB,
  assignCourseFaculitesIntoDB,
  removeCourseFaculitesFromDB,
}
