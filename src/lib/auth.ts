import { mongoClient } from '../config/mongo';

let authInstance: any = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const { betterAuth } = await import('better-auth');
  const { mongodbAdapter } = await import('better-auth/adapters/mongodb');

  const db = mongoClient.db();

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
