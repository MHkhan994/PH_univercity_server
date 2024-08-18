import { model, Schema } from 'mongoose'
import { TAdmin } from './admin.interface'
import { userNameSchema } from '../students/student.model'

const AdminSchema = new Schema<TAdmin>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'Users',
    },
    id: {
      type: String,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: userNameSchema,
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid gender',
      },
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
    },
    contactNo: { type: String },
    emergencyContactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
)

AdminSchema.virtual('fullName').get(function () {
  return this.name?.firstName + this.name?.middleName + this.name?.lastName
})

const Admin = model<TAdmin>('Admin', AdminSchema)

export default Admin
