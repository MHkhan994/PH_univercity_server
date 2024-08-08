import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      index: {
        unique: true,
        collation: { locale: 'en', strength: 2 },
      },
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },

  {
    timestamps: true,
  },
)

academicDepartmentSchema.pre('save', async function (next) {
  const departmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })

  if (departmentExist) {
    throw new Error('Department already exists')
  }

  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()

  const departmentExist = await AcademicDepartment.findOne({ _id: query._id })

  if (!departmentExist) {
    throw new Error('Department does not exists')
  }

  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
