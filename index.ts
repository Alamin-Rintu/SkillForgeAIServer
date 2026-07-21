import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { toNodeHandler } from 'better-auth/node';
import { connectDB } from './src/config/db';
import { connectMongoNative } from './src/config/mongo';
import { auth } from './src/lib/auth';
import authRoutes from './src/routes/authRoutes';
import roadmapRoutes from './src/routes/roadmapRoutes';
import blogRoutes from './src/routes/blogRoutes';
import aiRoutes from './src/routes/aiRoutes';
import analyticsRoutes from './src/routes/analyticsRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup supporting Credentials for Better Auth
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Cookie', 'set-cookie'],
  exposedHeaders: ['Set-Cookie']
}));

// Better Auth Express Router Mount (Express 5 compatible)
app.use('/api/auth', toNodeHandler(auth));

// Body Parsing Middleware for custom routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect DBs
connectDB().then(() => {
  connectMongoNative();
});

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: "online",
    name: "SkillForge AI Backend API with Better Auth & MongoDB",
    version: "1.1.0",
    timestamp: new Date()
  });
});

// Custom API Routes
app.use('/api/custom-auth', authRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('[server error]:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[server]: Running at http://localhost:${PORT}`);
    console.log(`[better-auth]: Mounted at http://localhost:${PORT}/api/auth`);
  });
}

export default app;