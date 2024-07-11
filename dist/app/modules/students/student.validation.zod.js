"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const guardianValidationSchema = zod_1.z.object({
    fathersName: zod_1.z.string({ message: "Father's Name is required" }),
    mothersName: zod_1.z.string({ message: "Mother's Name is required" }),
    fathersOccupation: zod_1.z.string().optional(),
    mothersOccupation: zod_1.z.string().optional(),
    fatherNo: zod_1.z.string({ message: "Father's Contact Number is required" }),
    mothersNo: zod_1.z.string({ message: "Mother's Contact Number is required" }),
});
const studentValidationZodSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: 'ID is required' }),
    name: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .max(20, { message: 'First Name cannot be more than 20 characters' }),
        lastName: zod_1.z
            .string()
            .max(20, { message: 'Last Name cannot be more than 20 characters' }),
    }),
    gender: zod_1.z.enum(['male', 'female', 'other'], {
        message: 'Gender must be one of: male, female, other',
    }),
    dateOfBirth: zod_1.z.string().min(1, { message: 'Date of Birth is required' }),
    contact: zod_1.z.string().min(1, { message: 'Contact is required' }),
    emergencyContact: zod_1.z.string().optional(),
    bloodGroup: zod_1.z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    email: zod_1.z
        .string()
        .email({ message: 'Invalid email format' })
        .min(1, { message: 'Email is required' }),
    avatar: zod_1.z.string().optional(),
    address: zod_1.z.object({
        presentAddress: zod_1.z
            .string()
            .min(1, { message: 'Present Address is required' }),
        currentAddress: zod_1.z
            .string()
            .min(1, { message: 'Current Address is required' }),
    }),
    guardian: guardianValidationSchema,
    profilePicture: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(['active', 'inactive'], {
        message: 'Status must be one of: active, inactive',
    }),
});
exports.default = studentValidationZodSchema;
