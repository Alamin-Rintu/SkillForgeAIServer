"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_1 = require("better-auth/node");
const db_1 = require("./src/config/db");
const mongo_1 = require("./src/config/mongo");
const auth_1 = require("./src/lib/auth");
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const roadmapRoutes_1 = __importDefault(require("./src/routes/roadmapRoutes"));
const blogRoutes_1 = __importDefault(require("./src/routes/blogRoutes"));
const aiRoutes_1 = __importDefault(require("./src/routes/aiRoutes"));
const analyticsRoutes_1 = __importDefault(require("./src/routes/analyticsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// CORS setup supporting Credentials for Better Auth
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
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
}));
// Better Auth Express Router Mount (Express 5 compatible)
app.use('/api/auth', (0, node_1.toNodeHandler)(auth_1.auth));
// Body Parsing Middleware for custom routes
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Connect DBs
(0, db_1.connectDB)().then(() => {
    (0, mongo_1.connectMongoNative)();
});
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
