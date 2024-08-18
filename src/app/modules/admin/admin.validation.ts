import { z } from 'zod'
import { createUserNameValidationSchema } from '../students/student.validation.zod'

const createAdminValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      designation: z.string(),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

const updateAdminValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z
      .object({
        name: createUserNameValidationSchema.partial(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.date().optional(),
        email: z.string().email().optional(),
        designation: z.string(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        profileImg: z.string().optional(),
      })
      .partial(), // This will make all admin fields optional
  }),
})

export const AdminValidations = {
  createAdminValidation,
  updateAdminValidation,
}
