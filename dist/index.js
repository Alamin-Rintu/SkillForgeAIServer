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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./src/config/db");
const mongo_1 = require("./src/config/mongo");
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const roadmapRoutes_1 = __importDefault(require("./src/routes/roadmapRoutes"));
const blogRoutes_1 = __importDefault(require("./src/routes/blogRoutes"));
const aiRoutes_1 = __importDefault(require("./src/routes/aiRoutes"));
const analyticsRoutes_1 = __importDefault(require("./src/routes/analyticsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// CORS setup supporting Credentials for Better Auth
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || origin.endsWith('.vercel.app')) {
            callback(null, true);
        }
        else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Cookie', 'set-cookie'],
    exposedHeaders: ['Set-Cookie']
};
app.use((0, cors_1.default)(corsOptions));
// Database connection middleware for Serverless execution
app.use(async (req, res, next) => {
    try {
        await (0, db_1.connectDB)();
        await (0, mongo_1.connectMongoNative)();
    }
    catch (err) {
        console.error('[DB connection middleware error]:', err);
    }
    next();
});
// Better Auth Express Router Mount (Express 5 & ESM compatible)
app.use('/api/auth', async (req, res, next) => {
    try {
        const { getAuth } = await Promise.resolve().then(() => __importStar(require('./src/lib/auth')));
        const auth = await getAuth();
        const { toNodeHandler } = await Promise.resolve().then(() => __importStar(require('better-auth/node')));
        const handler = toNodeHandler(auth);
        return handler(req, res);
    }
    catch (err) {
        next(err);
    }
});
// Body Parsing Middleware for custom routes
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: "online",
        name: "SkillForge AI Backend API with Better Auth & MongoDB",
        version: "1.1.0",
        timestamp: new Date()
    });
});
// Custom API Routes
app.use('/api/custom-auth', authRoutes_1.default);
app.use('/api/roadmaps', roadmapRoutes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
app.use('/api/ai', aiRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[server error]:', err);
    res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`[server]: Running at http://localhost:${PORT}`);
        console.log(`[better-auth]: Mounted at http://localhost:${PORT}/api/auth`);
    });
}
exports.default = app;
