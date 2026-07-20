import Roadmap from '../models/Roadmap';
import Blog from '../models/Blog';
import Review from '../models/Review';

export const seedInitialData = async () => {
  try {
    const roadmapCount = await Roadmap.countDocuments();
    if (roadmapCount === 0) {
      await Roadmap.insertMany([
        {
          title: "Full-Stack Modern Web Developer 2026",
          shortDescription: "Master React 19, Next.js App Router, Node.js Express 5, TypeScript, and MongoDB with AI API integrations.",
          fullDescription: "An end-to-end industry roadmap designed for aspiring full-stack engineers. Learn modern frontend rendering, REST API security, MongoDB schema design, and deploying AI features to production.",
          difficulty: "Intermediate",
          duration: "12 Weeks",
          category: "Full Stack",
          skills: ["React 19", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
          imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
          rating: 4.9,
          ratingCount: 342,
          topics: [
            {
              title: "1. Advanced React & Next.js Architecture",
              description: "Server Components, Client Components, Suspense, and Streaming SSR.",
              duration: "Weeks 1-3",
              resources: [{ name: "Next.js Official Documentation", url: "https://nextjs.org/docs", type: "doc" }]
            },
            {
              title: "2. Backend API Architecture & Security",
              description: "Building production Express 5 services, JWT auth, middleware, and rate limiting.",
              duration: "Weeks 4-7",
              resources: [{ name: "Express 5 Security Best Practices", url: "https://expressjs.com", type: "doc" }]
            },
            {
              title: "3. MongoDB Persistence & Schema Optimization",
              description: "Indexing, aggregation pipelines, and schema relationships with Mongoose.",
              duration: "Weeks 8-10",
              resources: [{ name: "MongoDB University Guide", url: "https://learn.mongodb.com", type: "course" }]
            },
            {
              title: "4. Gemini AI Integration & Cloud Deployment",
              description: "Connecting Google Gemini API for intelligent features and deploying on Vercel & Cloud.",
              duration: "Weeks 11-12",
              resources: [{ name: "Google AI Studio Quickstart", url: "https://ai.google.dev", type: "video" }]
            }
          ],
          prerequisites: ["Fundamental HTML/CSS/JavaScript", "Basic Git Commands"]
        },
        {
          title: "AI Engineer & LLM Application Mastery",
          shortDescription: "Build production AI applications using Gemini API, Vector Databases, Retrieval-Augmented Generation (RAG), and Prompt Engineering.",
          fullDescription: "Transform from a general software developer into a high-demand AI Application Engineer. Master LLM workflows, LangChain, RAG architecture, and fine-tuning AI agents.",
          difficulty: "Advanced",
          duration: "10 Weeks",
          category: "AI",
          skills: ["Gemini API", "Python", "TypeScript", "Vector DB", "RAG", "Prompt Engineering"],
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
          rating: 4.95,
          ratingCount: 289,
          topics: [
            {
              title: "1. LLM Fundamentals & Prompt Architecture",
              description: "Structured JSON outputs, system instructions, and token optimization.",
              duration: "Weeks 1-2",
              resources: [{ name: "Gemini API Guide", url: "https://ai.google.dev", type: "doc" }]
            },
            {
              title: "2. Vector Databases & RAG Pipelines",
              description: "Embedding generation, Pinecone/Qdrant, and context retrieval optimization.",
              duration: "Weeks 3-6",
              resources: [{ name: "RAG Architecture Handbook", url: "https://ai.google.dev", type: "doc" }]
            }
          ],
          prerequisites: ["Python or TypeScript experience", "API Integration concepts"]
        },
        {
          title: "Frontend Engineering & Ultra SaaS UI/UX",
          shortDescription: "Craft jaw-dropping SaaS web applications using Tailwind CSS v4, HeroUI, Framer Motion, and micro-interactions.",
          fullDescription: "Focus purely on user-facing excellence. Learn design systems, accessible component development, performance budget optimization, and complex Framer Motion transitions.",
          difficulty: "Beginner",
          duration: "8 Weeks",
          category: "Frontend",
          skills: ["React", "Tailwind CSS", "Framer Motion", "HeroUI", "Accessibility"],
          imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
          rating: 4.88,
          ratingCount: 198,
          topics: [
            {
              title: "1. Micro-animations & Motion Design",
              description: "Framer Motion layout animations, gesture handling, and keyframe transitions.",
              duration: "Weeks 1-4",
              resources: [{ name: "Framer Motion Documentation", url: "https://framer.com/motion", type: "doc" }]
            }
          ],
          prerequisites: ["HTML & Modern CSS"]
        },
        {
          title: "Backend Microservices & Cloud System Design",
          shortDescription: "Design scalable REST & gRPC microservices with Node.js, Express, Redis caching, and Docker containerization.",
          fullDescription: "Master backend architecture for high-concurrency enterprise applications. Build resilient APIs, message queues, and automated CI/CD pipelines.",
          difficulty: "Advanced",
          duration: "14 Weeks",
          category: "Backend",
          skills: ["Node.js", "Express", "Docker", "Redis", "System Design", "PostgreSQL"],
          imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
          rating: 4.91,
          ratingCount: 156,
          topics: [
            {
              title: "1. High Performance Caching & Load Balancing",
              description: "Redis caching strategies, rate limiting, and Nginx reverse proxies.",
              duration: "Weeks 1-4",
              resources: [{ name: "System Design Primer", url: "#", type: "doc" }]
            }
          ],
          prerequisites: ["Node.js Basics", "Database fundamentals"]
        },
        {
          title: "Data Science & Predictive Analytics Bootcamp",
          shortDescription: "From Python data analysis to Machine Learning models using Pandas, NumPy, Scikit-learn, and Interactive Dashboards.",
          fullDescription: "Become data fluent. Learn data cleaning, exploratory data analysis, predictive statistical models, and visualizing insights.",
          difficulty: "Intermediate",
          duration: "12 Weeks",
          category: "Data Science",
          skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Data Visualization"],
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
          rating: 4.84,
          ratingCount: 210,
          topics: [
            {
              title: "1. Python for Data Manipulation",
              description: "Master Pandas DataFrames, Series, filtering, and aggregation.",
              duration: "Weeks 1-3",
              resources: [{ name: "Pandas User Guide", url: "https://pandas.pydata.org", type: "doc" }]
            }
          ],
          prerequisites: ["Basic Math & Logic"]
        },
        {
          title: "Cyber Security & Ethical Hacking Essentials",
          shortDescription: "Learn web application vulnerability assessment, OWASP Top 10 defenses, penetration testing, and security auditing.",
          fullDescription: "Protect modern web infrastructure. Understand XSS, SQL Injection, CSRF, JWT hijacking, and build secure applications.",
          difficulty: "Intermediate",
          duration: "10 Weeks",
          category: "Cyber Security",
          skills: ["OWASP Top 10", "Web Security", "Penetration Testing", "Encryption"],
          imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
          rating: 4.89,
          ratingCount: 175,
          topics: [
            {
              title: "1. Web Vulnerability Auditing",
              description: "Identifying and mitigating OWASP Top 10 security risks in modern web applications.",
              duration: "Weeks 1-4",
              resources: [{ name: "OWASP Foundation Guide", url: "https://owasp.org", type: "doc" }]
            }
          ],
          prerequisites: ["Basic Web Architecture Concepts"]
        }
      ]);
      console.log('[seed]: Sample roadmaps seeded.');
    }

    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany([
        {
          title: "How Gemini AI is Revolutionizing Tech Career Roadmaps in 2026",
          slug: "gemini-ai-career-roadmaps-2026",
          excerpt: "Discover how AI personalized learning paths shorten the journey to landing a senior software engineer role.",
          content: `Artificial Intelligence is completely transforming how developers and students acquire new technical skills. Rather than following static 50-hour video courses, developers now utilize personalized AI roadmap engines that adapt to existing knowledge and target career goals.

Key Benefits of AI-Driven Career Roadmaps:
1. Dynamic Adaptation: Skip topics you already master.
2. Real-World Project Scenarios: Practice with AI-generated project briefs matching active tech job requirements.
3. Continuous Interview Prep: Practice coding and system design interviews in parallel with your learning path.

At SkillForge AI, we leverage Google Gemini API to structure intelligent, week-by-week learning schedules tailored to your available time.`,
          category: "AI & Tech",
          author: "Dr. Sarah Jenkins",
          authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
          readTime: "5 min read",
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Mastering the Technical Interview: 7 AI Coaching Strategies",
          slug: "mastering-technical-interview-ai-coaching",
          excerpt: "Boost your interview confidence with interactive AI mock interviews, live feedback, and real-time coding practice.",
          content: `Technical interviews can be daunting, but consistent practice with conversational AI interview coaches can dramatically increase your offer conversion rate.

Top 3 Strategies for AI Mock Interviews:
- Practice articulating your system design choices out loud.
- Prompt the AI to ask tough follow-up edge-case questions.
- Review ATS scores on your resume to ensure keywords match company expectations.`,
          category: "Career Advice",
          author: "Marcus Vance",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          readTime: "7 min read",
          imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "The 2026 Full-Stack Developer Roadmap: From Next.js 16 to Express 5",
          slug: "fullstack-developer-roadmap-2026",
          excerpt: "A complete guide to the modern web stack: React 19, Next.js App Router, Tailwind CSS v4, and MongoDB.",
          content: `Web development moves fast. In 2026, standard modern full-stack architectures combine React 19's asynchronous transitions and server components with light-weight Node.js Express 5 microservices.

Build projects that matter by focusing on user experience, high accessibility, glassmorphic UI aesthetics, and seamless AI integrations.`,
          category: "Web Development",
          author: "Alex Morgan",
          authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
          readTime: "6 min read",
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
        }
      ]);
      console.log('[seed]: Sample blogs seeded.');
    }
  } catch (err) {
    console.warn('[seed]: Seeding non-critical error:', err);
  }
};
