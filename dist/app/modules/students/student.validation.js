"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const guardianJoiSchema = joi_1.default.object({
    fathersName: joi_1.default.string().required(),
    mothersName: joi_1.default.string().required(),
    fathersOccupation: joi_1.default.string().optional(),
    mothersOccupation: joi_1.default.string().optional(),
    fatherNo: joi_1.default.string().required(),
    mothersNo: joi_1.default.string().required(),
});
const studentJoiSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.object({
        firstName: joi_1.default.string().required().max(20),
        lastName: joi_1.default.string().required().max(20),
    }).required(),
    gender: joi_1.default.string().valid('male', 'female', 'other').required(),
    dateOfBirth: joi_1.default.string().required(),
    contact: joi_1.default.string().required(),
    emergencyContact: joi_1.default.string().optional(),
    bloodGroup: joi_1.default.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .optional(),
    email: joi_1.default.string().email().required(),
    avatar: joi_1.default.string().optional(),
    address: joi_1.default.object({
        presentAddress: joi_1.default.string().required(),
        currentAddress: joi_1.default.string().required(),
    }).required(),
    guardian: guardianJoiSchema.required(),
    profilePicture: joi_1.default.string().required(),
    isActive: joi_1.default.string().valid('active', 'inactive').required(),
});
exports.default = studentJoiSchema;
