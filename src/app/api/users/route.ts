import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, requireAuth } from '../../../lib/auth';
import { UserModel } from '../../../db/models/user';

export async function GET(req: NextRequest) {
  try {
    // Check if the request is for the current user or a list of users
    const url = new URL(req.url);
    const me = url.searchParams.get('me') === 'true';

    if (me) {
      // Get current user with session
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ user });
    } else {
      // For listing users, require authentication
      await requireAuth();
      
      // Pagination parameters
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const offset = parseInt(url.searchParams.get('offset') || '0');
      
      const users = await UserModel.list(limit, offset);
      return NextResponse.json({ users });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    if ((error as Error).message === 'Authentication required') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    // Only allow updating certain fields
    const allowedUpdates = ['username', 'email'];
    const updates: Record<string, any> = {};
    
    for (const key of allowedUpdates) {
      if (data[key] !== undefined) {
        updates[key] = data[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid update fields provided' },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.update(user.id, updates);
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
