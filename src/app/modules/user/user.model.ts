import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  const user = this

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.pre('save', async function (next) {
  const user = this
  const exist = await User.findOne({ id: user.id })

  if (exist) {
    throw new AppError(httpStatus.CONFLICT, 'User already exist')
  }

  next()
})

userSchema.post('save', async function (user, next) {
  user.password = ''
  next()
})

export const User = model<TUser>('Users', userSchema)
