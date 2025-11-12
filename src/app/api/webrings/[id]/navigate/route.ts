import { NextRequest, NextResponse } from 'next/server';
import { WebringModel } from '@/db/models/webring';
import { UserModel } from '@/db/models/user';

// GET /api/webrings/[id]/navigate?direction=next|previous|random&from=userId
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const direction = searchParams.get('direction') || 'next';
    const fromUserId = parseInt(searchParams.get('from') || '0');

    const id = parseInt(params.id);

    if (isNaN(id) || isNaN(fromUserId) || fromUserId === 0) {
      return NextResponse.json(
        { error: 'Invalid parameters', data: null },
        { status: 400 }
      );
    }

    const webring = await WebringModel.findById(id);

    if (!webring) {
      return NextResponse.json(
        { error: 'Webring not found', data: null },
        { status: 404 }
      );
    }

    let targetUserId: number | null = null;

    switch (direction) {
      case 'next':
        targetUserId = await WebringModel.getNextMember(id, fromUserId);
        break;
      case 'previous':
        targetUserId = await WebringModel.getPreviousMember(id, fromUserId);
        break;
      case 'random':
        targetUserId = await WebringModel.getRandomMember(id, fromUserId);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid direction. Use: next, previous, or random', data: null },
          { status: 400 }
        );
    }

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'No target user found', data: null },
        { status: 404 }
      );
    }

    const targetUser = await UserModel.findById(targetUserId);

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found', data: null },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: {
        userId: targetUser.id,
        username: targetUser.username,
        url: `/users/${targetUser.username}`
      },
      error: null
    });
  } catch (error) {
    console.error('Error navigating webring:', error);
    return NextResponse.json(
      { error: 'Failed to navigate webring', data: null },
      { status: 500 }
    );
  }
}
