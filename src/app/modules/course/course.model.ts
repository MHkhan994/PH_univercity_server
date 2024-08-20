import { model, Schema } from 'mongoose'
import { TCourse, TPreRequisitCourses } from './course.interface'

const preRequisitCoursesSchema = new Schema<TPreRequisitCourses>({
  course: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Course Type is required'],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisitCourses: preRequisitCoursesSchema,
})

const Course = model<TCourse>('Course', CourseSchema)

export default Course
