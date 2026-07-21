# ⚙️ SkillForge AI Server — Express 5 & MongoDB Backend API

[![Live Frontend App](https://img.shields.io/badge/Live%20Frontend-Vercel-blue?style=for-the-badge&logo=vercel)](https://skill-forge-ai-ivory-gamma.vercel.app/)

**🌐 Live Application URL**: [https://skill-forge-ai-ivory-gamma.vercel.app/](https://skill-forge-ai-ivory-gamma.vercel.app/)

Backend REST API & AI Service for **SkillForge AI** built with Node.js, Express 5, TypeScript, MongoDB Atlas, Better Auth, and Google Gemini API.

---

## 🚀 Key Features

- **Express 5 Framework**: Production-ready TypeScript routes, controllers, and middleware.
- **MongoDB Atlas Integration**: Mongoose models (`User`, `Roadmap`, `Blog`, `Review`, `SavedRoadmap`, `ResumeAnalysis`, `CareerRecommendation`, `AIChat`) + native `MongoClient` driver.
- **Better Auth Engine (`better-auth`)**: Built-in `mongodbAdapter` serving `/api/auth/*` session endpoints.
- **Google Gemini API**: `gemini-2.5-flash` handlers for AI roadmap generation, ATS resume auditing, career advice, and interview coaching with automatic fallback engine.
- **Auto Data Seeding**: Automatically seeds initial high-quality roadmaps, articles, and reviews upon database connection.

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5000
MONGODB_URI=mongodb+srv://SkillFrogeAI:<password>@cluster0.gizlskc.mongodb.net/SkillForgeAI?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=skillforge_secret_key_2026
BETTER_AUTH_SECRET=5WZTiVmqqhmKnxZw0Uhhq4vlQ705LQ3x
BETTER_AUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🚦 Commands

```bash
# Install dependencies
npm install

# Start development server with watch mode
npm run dev

# Build TypeScript to dist/
npm run build

# Start production build
npm start
```

---

## 🔌 Core API Routes

- `ALL /api/auth/*`: Better Auth session & user management
- `POST /api/custom-auth/register`: Register user
- `POST /api/custom-auth/login`: User login
- `POST /api/custom-auth/demo-login`: 1-Click Demo access
- `GET /api/roadmaps`: Fetch roadmaps (supports `?search=`, `?category=`, `?difficulty=`, `?sortBy=`, `?page=`)
- `GET /api/roadmaps/:id`: Get single roadmap detail with reviews
- `POST /api/roadmaps`: Create roadmap
- `DELETE /api/roadmaps/:id`: Delete roadmap
- `POST /api/ai/roadmap-generator`: Gemini AI roadmap generator
- `POST /api/ai/resume-analyzer`: Gemini AI ATS resume analyzer
- `POST /api/ai/career-advisor`: Gemini AI career recommendations
- `POST /api/ai/interview-coach`: Gemini AI interview assistant
- `GET /api/analytics`: Platform analytics for charts
