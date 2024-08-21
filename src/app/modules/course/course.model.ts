import { model, Schema } from 'mongoose'
import { TCourse, TPreRequisitCourses } from './course.interface'

const preRequisitCoursesSchema = new Schema<TPreRequisitCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
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
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisitCourses: {
    type: Array(preRequisitCoursesSchema),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const Course = model<TCourse>('Course', CourseSchema)

export default Course
