"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DEFAULT_URI = 'mongodb+srv://SkillFrogeAI:A4wv9IzNaK6w5B0y@cluster0.gizlskc.mongodb.net/SkillForgeAI?retryWrites=true&w=majority&appName=Cluster0';
const connectDB = async () => {
    try {
        const connStr = process.env.MONGODB_URI || DEFAULT_URI;
        const conn = await mongoose_1.default.connect(connStr);
        console.log(`[database]: MongoDB connected successfully to ${conn.connection.host}`);
    }
    catch (error) {
        console.warn('[database]: MongoDB Atlas connection warning:', error);
    }
};
exports.connectDB = connectDB;
