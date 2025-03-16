import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { UserModel } from '../db/models/user';
import { ProfileModel } from '../db/models/profile';

interface ExtendedSession extends Session {
  user?: {
    id?: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as ExtendedSession;
  if (!session?.user?.id) return null;
  
  const user = await UserModel.findById(session.user.id);
  return user;
}

export async function getCurrentUserWithProfile() {
  const session = await getServerSession(authOptions) as ExtendedSession;
  if (!session?.user?.id) return null;
  
  const user = await UserModel.findById(session.user.id);
  if (!user) return null;
  
  const profile = await ProfileModel.findByUserId(user.id);
  return { user, profile };
}

export function isAuthenticated(session: any): session is ExtendedSession {
  return Boolean(session?.user?.id);
}

export async function hasPermission(userId: number, resourceUserId: number) {
  return userId === resourceUserId;
}

export async function requireAuth() {
  const session = await getServerSession(authOptions) as ExtendedSession;
  if (!isAuthenticated(session)) {
    throw new Error('Authentication required');
  }
  return session;
}
