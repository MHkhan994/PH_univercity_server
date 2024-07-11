"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const guardianSchema = new mongoose_1.Schema({
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    fathersOccupation: { type: String },
    mothersOccupation: { type: String },
    fatherNo: { type: String, required: true },
    mothersNo: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: String, required: true },
    contact: { type: String, required: true },
    emergencyContact: { type: String },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: { type: String, required: true },
    avatar: { type: String },
    address: {
        presentAddress: { type: String, required: true },
        currentAddress: { type: String, required: true },
    },
    guardian: { type: guardianSchema, required: true },
    profilePicture: { type: String, required: true },
    isActive: { type: String, enum: ['active', 'inactive'], required: true },
}, {
    toJSON: {
        virtuals: true,
    },
});
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.lastName}`;
});
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
