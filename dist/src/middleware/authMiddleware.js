"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // If guest/demo mode, proceed with default demo user
        req.user = { id: 'demo-user-123', email: 'demo@skillforge.ai', role: 'student', name: 'Demo Student' };
        return next();
    }
    const secret = process.env.JWT_SECRET || 'skillforge_secret_key_2026';
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            req.user = { id: 'demo-user-123', email: 'demo@skillforge.ai', role: 'student', name: 'Demo Student' };
            return next();
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
