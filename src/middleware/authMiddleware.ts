import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If guest/demo mode, proceed with default demo user
    req.user = { id: 'demo-user-123', email: 'demo@skillforge.ai', role: 'student', name: 'Demo Student' };
    return next();
  }

  const secret = process.env.JWT_SECRET || 'skillforge_secret_key_2026';
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      req.user = { id: 'demo-user-123', email: 'demo@skillforge.ai', role: 'student', name: 'Demo Student' };
      return next();
    }
    req.user = decoded;
    next();
  });
};
