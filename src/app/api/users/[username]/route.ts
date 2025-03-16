import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '../../../../db/models/user';
import { ProfileModel } from '../../../../db/models/profile';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const user = await UserModel.findByUsername(username);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user profile
    const profile = await ProfileModel.findByUserId(user.id);

    // Return user with profile but exclude sensitive information
    const { auth_domain, email, ...safeUser } = user;
    
    return NextResponse.json({
      user: safeUser,
      profile
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
