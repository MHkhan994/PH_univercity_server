import { z } from 'zod'
import { createUserNameValidationSchema } from '../students/student.validation.zod'

const createAdminValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const AdminValidations = {
  createAdminValidation,
}
