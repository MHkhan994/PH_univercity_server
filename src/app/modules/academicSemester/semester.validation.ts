import { z } from 'zod'
import { months, semesterCode, semesterName } from './semester.variables'

const createSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    year: z.date(),
    code: z.enum([...semesterCode] as [string, ...string[]]),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
})

export const AcademicSemisterValidations = {
  createSemesterValidationSchema,
}
