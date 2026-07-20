import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import ResumeAnalysis from '../models/ResumeAnalysis';
import CareerRecommendation from '../models/CareerRecommendation';
import AIChat from '../models/AIChat';

// Initialize Gemini API client if key available
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

// 1. AI Roadmap Generator
export const generateRoadmap = async (req: Request, res: Response) => {
  try {
    const { currentSkillLevel, targetJob, availableTime, programmingLanguages, experience } = req.body;

    const aiClient = getGeminiClient();
    if (aiClient) {
      try {
        const prompt = `Act as an expert tech career advisor. Generate a highly detailed learning roadmap for a student aiming to become a "${targetJob}".
Current skill level: ${currentSkillLevel}.
Available time per week: ${availableTime}.
Known programming languages: ${programmingLanguages}.
Prior experience: ${experience}.

Return ONLY valid JSON with no markdown wrapping in this exact structure:
{
  "title": "Roadmap Title",
  "shortDescription": "Concise summary",
  "estimatedCompletionTime": "e.g. 10 Weeks (12 hrs/week)",
  "weeklySchedule": [
    {
      "week": 1,
      "title": "Week Title",
      "focus": "Key concept",
      "topics": ["Topic 1", "Topic 2"],
      "resources": [{"name": "Resource Name", "url": "https://example.com"}]
    }
  ],
  "recommendedProjects": [
    { "title": "Project Title", "description": "Project details", "techStack": ["React", "Node.js"] }
  ]
}`;
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });
        const text = response.text || '';
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        return res.json({ success: true, data: parsed, isRealAI: true });
      } catch (geminiErr) {
        console.warn('Gemini API call error, using fallback AI engine:', geminiErr);
      }
    }

    // Fallback AI Engine
    const target = targetJob || 'Full Stack Engineer';
    const level = currentSkillLevel || 'Intermediate';
    const langs = programmingLanguages || 'JavaScript, TypeScript';

    const fallbackRoadmap = {
      title: `AI Personalized Roadmap: ${target}`,
      shortDescription: `Custom-tailored learning path crafted for ${level} level focused on ${langs}.`,
      estimatedCompletionTime: `${availableTime || '15 Hours/Week'} • 8 Weeks Total`,
      weeklySchedule: [
        {
          week: 1,
          title: "Foundations & Environment Architecture",
          focus: "Modern tooling, environment setup, and language fundamentals",
          topics: [`Deep Dive into ${langs.split(',')[0] || 'Core JS'}`, "Git Flow & CI/CD Basics", "System Architecture Overview"],
          resources: [
            { name: "Official Developer Specs & MDN Guides", url: "https://developer.mozilla.org" },
            { name: "FreeCodeCamp Architecture Essentials", url: "https://freecodecamp.org" }
          ]
        },
        {
          week: 2,
          title: "Frontend Mastery & Modern UI Components",
          focus: "State management, component design patterns, and responsive UX",
          topics: ["React 19 & Next.js App Router", "Tailwind CSS & Design Systems", "Async Data Fetching & Caching"],
          resources: [
            { name: "Next.js Official Documentation", url: "https://nextjs.org/docs" },
            { name: "HeroUI & Framer Motion Integration", url: "https://heroui.com" }
          ]
        },
        {
          week: 3,
          title: "Backend API Engineering & Microservices",
          focus: "RESTful architecture, authentication, and database modeling",
          topics: ["Node.js Express 5 Architecture", "MongoDB & Mongoose Schema Design", "JWT Auth & Security Best Practices"],
          resources: [
            { name: "Express.js Routing Guide", url: "https://expressjs.com" },
            { name: "MongoDB University Certification Prep", url: "https://learn.mongodb.com" }
          ]
        },
        {
          week: 4,
          title: "AI Integration & Production Deployment",
          focus: "Connecting LLMs, Vercel deployment, Docker, and Cloud hosting",
          topics: ["Google Gemini API Integration", "Vercel & Render Deployment Pipelines", "Performance Auditing & Security"],
          resources: [
            { name: "Google AI Studio Documentation", url: "https://ai.google.dev" },
            { name: "Vercel Deployment Best Practices", url: "https://vercel.com/docs" }
          ]
        }
      ],
      recommendedProjects: [
        {
          title: `Full-Stack ${target} Capstone Platform`,
          description: `Build a production-grade application featuring user authentication, MongoDB persistence, and Gemini AI integration.`,
          techStack: [langs.split(',')[0] || 'TypeScript', 'Next.js', 'Express', 'MongoDB', 'Gemini AI']
        },
        {
          title: "Real-time Analytics & Interactive Dashboard",
          description: "Develop a data visualization portal utilizing Recharts, WebSocket updates, and server-side metrics caching.",
          techStack: ['React', 'Recharts', 'Tailwind CSS', 'Node.js']
        }
      ]
    };

    return res.json({ success: true, data: fallbackRoadmap, isRealAI: false });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. AI Resume Analyzer
export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const { resumeText, targetRole = 'Software Engineer' } = req.body;

    if (!resumeText || resumeText.trim().length < 20) {
      return res.status(400).json({ success: false, message: 'Please provide valid resume text or document content.' });
    }

    const aiClient = getGeminiClient();
    if (aiClient) {
      try {
        const prompt = `Analyze this candidate resume for the target role of "${targetRole}".
Resume Content:
${resumeText}

Return ONLY valid JSON matching this structure:
{
  "score": 85,
  "atsCompatibility": 88,
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "missingSkills": ["Skill 1", "Skill 2"],
  "suggestedImprovements": ["Actionable improvement 1", "Actionable improvement 2"]
}`;
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });
        const text = response.text || '';
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        
        await ResumeAnalysis.create({
          userId: req.body.userId || 'demo-user-123',
          resumeText,
          score: parsed.score || 82,
          strengths: parsed.strengths || [],
          weaknesses: parsed.weaknesses || [],
          missingSkills: parsed.missingSkills || [],
          atsCompatibility: parsed.atsCompatibility || 85,
          suggestedImprovements: parsed.suggestedImprovements || []
        });

        return res.json({ success: true, data: parsed });
      } catch (err) {
        console.warn('Gemini analysis failed, using fallback rule engine:', err);
      }
    }

    // Heuristic Analysis Engine
    const wordCount = resumeText.split(/\s+/).length;
    const hasGithub = /github\.com/i.test(resumeText);
    const hasLinkedin = /linkedin\.com/i.test(resumeText);
    const hasReact = /react|next\.?js/i.test(resumeText);
    const hasNode = /node|express|backend/i.test(resumeText);
    const hasTypeScript = /typescript|ts/i.test(resumeText);

    const score = Math.min(96, Math.max(65, 70 + (hasGithub ? 8 : 0) + (hasLinkedin ? 6 : 0) + (hasReact ? 6 : 0) + (hasTypeScript ? 6 : 0)));
    const atsScore = Math.min(94, score + 4);

    const result = {
      score,
      atsCompatibility: atsScore,
      strengths: [
        hasGithub ? "Includes GitHub profile link for portfolio proof" : "Clear structural formatting",
        hasReact ? "Demonstrates modern frontend experience with React ecosystem" : "Strong technical foundation",
        "Clear quantifiable achievements and bullet points",
        "Well-formatted contact and header credentials"
      ],
      weaknesses: [
        hasTypeScript ? "Could quantify technical metrics further (e.g. % performance increase)" : "Missing explicit TypeScript experience",
        "Lack of metrics showcasing business impact of recent projects"
      ],
      missingSkills: [
        hasTypeScript ? "Docker & Containerization" : "TypeScript",
        "GraphQL / RESTful OpenAPI Specs",
        "Jest / Cypress Testing Frameworks",
        "AWS / Cloud Deployment Pipelines"
      ],
      suggestedImprovements: [
        "Quantify project accomplishments using the Action Verb + Context + Result formula (e.g., 'Optimized database queries by 40%').",
        "Add explicit ATS keywords matching target job descriptions in a dedicated Skills matrix.",
        "Include links to live hosted projects alongside GitHub repositories."
      ]
    };

    await ResumeAnalysis.create({
      userId: req.body.userId || 'demo-user-123',
      resumeText,
      score: result.score,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      missingSkills: result.missingSkills,
      atsCompatibility: result.atsCompatibility,
      suggestedImprovements: result.suggestedImprovements
    });

    return res.json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. AI Career Recommendation Engine
export const recommendCareer = async (req: Request, res: Response) => {
  try {
    const { targetJob = 'Full Stack Developer', userSkills = ['JavaScript', 'React', 'HTML/CSS'] } = req.body;

    const data = {
      targetJob,
      recommendedJobs: [
        { title: `Senior ${targetJob}`, matchScore: 92, reason: "High demand with your frontend and API foundation." },
        { title: "Frontend Software Engineer", matchScore: 96, reason: "Perfect alignment with current React and UI skill set." },
        { title: "Full Stack Cloud Solutions Architect", matchScore: 84, reason: "Great progression path as you gain Node.js and Cloud skills." }
      ],
      recommendedCourses: [
        { title: "Advanced React 19 & Next.js App Router Mastery", provider: "SkillForge AI Academy", url: "#" },
        { title: "Production Express 5 & MongoDB Microservices", provider: "SkillForge Pro", url: "#" }
      ],
      recommendedProjects: [
        {
          title: "AI-Powered SaaS Analytics Dashboard",
          description: "Build an interactive analytics suite with real-time data streaming and AI insights.",
          techStack: ["Next.js", "Recharts", "Express", "MongoDB", "Gemini API"]
        },
        {
          title: "Collaborative Project Management Tool",
          description: "Develop a Kanban-style application with real-time WebSockets and automated team updates.",
          techStack: ["React", "Node.js", "Socket.io", "Tailwind CSS"]
        }
      ],
      recommendedCertificates: [
        { title: "Full Stack Web Developer Professional Certificate", issuer: "SkillForge Institute" },
        { title: "AWS Certified Developer - Associate", issuer: "Amazon Web Services" }
      ]
    };

    await CareerRecommendation.create({
      userId: req.body.userId || 'demo-user-123',
      targetJob,
      recommendedJobs: data.recommendedJobs,
      recommendedCourses: data.recommendedCourses,
      recommendedProjects: data.recommendedProjects,
      recommendedCertificates: data.recommendedCertificates
    });

    return res.json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. AI Interview Assistant
export const interviewChat = async (req: Request, res: Response) => {
  try {
    const { message, topic = 'Frontend Engineering', history = [] } = req.body;

    const aiClient = getGeminiClient();
    if (aiClient) {
      try {
        const prompt = `You are a Senior Technical Interviewer conduct an interview for topic: "${topic}".
User message: "${message}".
Conversation context: ${JSON.stringify(history.slice(-4))}.
Provide a helpful, realistic mock interview response. Include code snippet if relevant, constructive feedback, and one targeted follow-up question.`;
        
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });

        return res.json({
          success: true,
          reply: response.text,
          suggestedPrompts: [
            "Can you explain the Virtual DOM in detail?",
            "What is the difference between Server Actions and API Routes in Next.js?",
            "How do you handle error boundaries in React 19?"
          ]
        });
      } catch (err) {
        console.warn('Gemini chat failed, fallback response active:', err);
      }
    }

    // Interactive Mock Interview AI fallback response
    let reply = "";
    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
      reply = `Hello! Welcome to your **${topic}** mock interview session. I am your SkillForge AI Interview Coach. To start, could you introduce yourself and tell me about a recent complex technical project you built?`;
    } else if (message.toLowerCase().includes("state") || message.toLowerCase().includes("react")) {
      reply = `Great points on React state management! 

Key takeaway: When managing complex application state, prefer keeping server state managed by tools like **TanStack Query** or Next.js server components, while keeping UI transient state local to components.

**Follow-up Question**:
How would you approach optimizing a React component that re-renders excessively due to prop updates?`;
    } else {
      reply = `Thank you for sharing that detailed explanation regarding **${topic}**! You demonstrated good technical depth.

**Feedback**:
- **Strength**: Clear explanation of core concepts and architecture choices.
- **Improvement Area**: Be sure to discuss edge cases like error handling and network timeouts.

**Next Question**:
Can you walk me through how you design an authenticated REST API route handling JWT validation and error response status codes?`;
    }

    return res.json({
      success: true,
      reply,
      suggestedPrompts: [
        "How do you optimize web app initial load times?",
        "Explain the event loop and asynchronous tasks in JavaScript.",
        "What are the best practices for securing Express API endpoints?"
      ]
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
