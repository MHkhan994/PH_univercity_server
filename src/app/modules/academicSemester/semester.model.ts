import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './semester.interface'
import { months, semesterCode, semesterName } from './semester.variables'

const SemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: [true, 'Semester name is required'],
      enum: {
        values: semesterName,
        message: '{VALUE} is not a valid semester name',
      },
    },
    code: {
      type: String,
      required: [true, 'Semester code is required'],
      enum: {
        values: semesterCode,
        message: '{VALUE} is not a valid semester code',
      },
    },
    year: {
      type: Date,
      required: [true, 'Semester year is required'],
    },
    startMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not a valid month',
      },
    },
    endMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not a valid month',
      },
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicSemister = model<TAcademicSemester>(
  'semester',
  SemesterSchema,
)
