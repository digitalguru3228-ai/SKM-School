import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db, User } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'skm_kanodar_edu_jwt_super_secret_key_2026_production';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'super_admin' | 'content_admin' | 'viewer';
  };
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      name: string;
      email: string;
      role: 'super_admin' | 'content_admin' | 'viewer';
    };
  } catch (err) {
    return null;
  }
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  let token = req.cookies?.skm_admin_token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required. Please log in.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session. Please log in again.' });
  }

  // Check if user is still active in DB
  const user = db.getState().users.find(u => u.id === decoded.id && u.is_active);
  if (!user) {
    return res.status(403).json({ success: false, error: 'User account disabled or not found.' });
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  next();
}

export function requireRoles(...allowedRoles: Array<'super_admin' | 'content_admin' | 'viewer'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: 'Permission denied. Your role cannot perform this action.' 
      });
    }

    next();
  };
}
