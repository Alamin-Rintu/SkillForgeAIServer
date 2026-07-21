"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth = void 0;
const mongo_1 = require("../config/mongo");
let authInstance = null;
const getAuth = async () => {
    if (authInstance)
        return authInstance;
    const { betterAuth } = await Promise.resolve().then(() => __importStar(require('better-auth')));
    const { mongodbAdapter } = await Promise.resolve().then(() => __importStar(require('better-auth/adapters/mongodb')));
    const db = mongo_1.mongoClient.db();
    authInstance = betterAuth({
        database: mongodbAdapter(db),
        emailAndPassword: {
            enabled: true,
        },
        secret: process.env.BETTER_AUTH_SECRET || '5WZTiVmqqhmKnxZw0Uhhq4vlQ705LQ3x',
        baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
        trustedOrigins: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://localhost:5000'
        ],
        user: {
            additionalFields: {
                targetRole: {
                    type: 'string',
                    required: false,
                    defaultValue: 'Full Stack Engineer',
                },
                role: {
                    type: 'string',
                    required: false,
                    defaultValue: 'student',
                },
            },
        },
    });
    return authInstance;
};
exports.getAuth = getAuth;
