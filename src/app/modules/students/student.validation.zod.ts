import { z } from 'zod'

export const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
})

const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

const updateStudentValidationSchema = z.object({
  body: z
    .object({
      password: z.string().max(20).optional(),
      student: z
        .object({
          name: createUserNameValidationSchema.partial(), // Make all fields in name optional
          gender: z.enum(['male', 'female', 'other']).optional(),
          dateOfBirth: z.date().optional(),
          email: z.string().email().optional(),
          contactNo: z.string().optional(),
          emergencyContactNo: z.string().optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          presentAddress: z.string().optional(),
          permanentAddress: z.string().optional(),
          guardian: createGuardianValidationSchema.partial(), // Make all fields in guardian optional
          localGuardian: createLocalGuardianValidationSchema.partial(), // Make all fields in localGuardian optional
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
          academicFaculty: z.string().optional(),
          profileImg: z.string().optional(),
        })
        .partial(), // Make all fields in student optional
    })
    .partial(), // Make all fields in body optional
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
