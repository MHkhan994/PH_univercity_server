"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentControllers = void 0;
const student_service_1 = require("./student.service");
const student_validation_zod_1 = __importDefault(require("./student.validation.zod"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student } = req.body;
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   })
    // }
    try {
        const zodParseData = student_validation_zod_1.default.parse(student);
        const result = yield student_service_1.studentServices.createStudentToDb(zodParseData);
        res.status(200).json({
            status: 'success',
            message: 'student create successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: err,
        });
        console.log(err);
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.studentServices.getAllStudentsFromDB();
        res.status(200).json({
            status: 'success',
            message: 'got all students',
            students: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield student_service_1.studentServices.getSingleStudentFromDB(id);
        res.status(200).json({
            status: 'success',
            message: 'got single student',
            students: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.studentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
