import { z } from 'zod'

const preRequisitCoursesValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisitCourses: z.array(preRequisitCoursesValidation).optional(),
  }),
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisitCourses: z
      .array(preRequisitCoursesValidation.partial())
      .optional(),
  }),
})

const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
}

export default CourseValidations
