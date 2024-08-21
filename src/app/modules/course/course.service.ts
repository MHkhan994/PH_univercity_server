import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constant'
import { TCourse } from './course.interface'
import Course from './course.model'

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
      select: '-_id -__v',
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

const updateCourseIntoDB = async (id:string, payload: Partial<TCourse>) => {
  const { preRequisitCourses, ...remainingUpdateData } = payload
  
  // spep 1 basic course info update

  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, remainingUpdateData, { new: true, runValidators: true })

  if (preRequisitCourses && preRequisitCourses.length > 0) {
    // filter out the deleted fields
    const deletedPreRequisits = preRequisitCourses.filter(el => el.course && el.isDeleted).map(el => el.course)

    console.log(deletedPreRequisits)
  }
  
  return updatedBasicCourseInfo
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseIntoDB,
  updateCourseIntoDB
}
