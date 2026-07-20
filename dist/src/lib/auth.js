"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const mongodb_1 = require("better-auth/adapters/mongodb");
const mongo_1 = require("../config/mongo");
const db = mongo_1.mongoClient.db();
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, mongodb_1.mongodbAdapter)(db),
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
