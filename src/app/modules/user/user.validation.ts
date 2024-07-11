import { z } from 'zod'

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password cannot be more than 20 charecters' })
    .optional(),
})

export const UserValidation = {
  userValidationSchema,
}
