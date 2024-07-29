import { z } from 'zod'

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Name is Required',
      })
      .optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Invalid academic faculty',
      required_error: 'Academic Faculty is Required',
    }),
  }),
})

const createAcademicDepartmentValidationSchema = z.object({
  body: z
    .object({
      name: z.string({ invalid_type_error: 'Academic Faculty must be string' }),
    })
    .optional(),
  academicFaculty: z
    .string({
      invalid_type_error: 'Invalid academic faculty',
      required_error: 'Academic Faculty is Required',
    })
    .optional(),
})

export const AcademicDepartmentValidation = {
  updateAcademicDepartmentValidationSchema,
  createAcademicDepartmentValidationSchema,
}
