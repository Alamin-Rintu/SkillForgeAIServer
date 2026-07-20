import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { mongoClient } from '../config/mongo';

const db = mongoClient.db();

export const auth = betterAuth({
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
