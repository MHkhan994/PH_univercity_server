import { Types } from 'mongoose'
import { TBloodGroup, TGender, TUserName } from '../students/student.interface'

export interface TAdmin {
  id: string
  user: Types.ObjectId
  designation: string
  name: TUserName
  gender: TGender
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContactNo: string
  bloogGroup?: TBloodGroup
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  isDeleted: boolean
}
