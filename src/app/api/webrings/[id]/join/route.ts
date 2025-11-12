import { NextRequest, NextResponse } from 'next/server';
import { WebringModel } from '@/db/models/webring';
import { requireAuth } from '@/lib/auth';

// POST /api/webrings/[id]/join - Join a webring
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    const userId = (session.user as any)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', data: null },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid webring ID', data: null },
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

    // Check if already a member
    const isMember = await WebringModel.isMember(id, userId);
    if (isMember) {
      return NextResponse.json(
        { error: 'Already a member of this webring', data: null },
        { status: 400 }
      );
    }

    await WebringModel.addMember(id, userId);

    return NextResponse.json({
      data: { message: 'Successfully joined webring' },
      error: null
    });
  } catch (error) {
    console.error('Error joining webring:', error);
    return NextResponse.json(
      { error: 'Failed to join webring', data: null },
      { status: 500 }
    );
  }
}

// DELETE /api/webrings/[id]/join - Leave a webring
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    const userId = (session.user as any)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', data: null },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid webring ID', data: null },
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

    // Check if member
    const isMember = await WebringModel.isMember(id, userId);
    if (!isMember) {
      return NextResponse.json(
        { error: 'Not a member of this webring', data: null },
        { status: 400 }
      );
    }

    // Creator cannot leave their own webring
    if (webring.creator_id === userId) {
      return NextResponse.json(
        { error: 'Creator cannot leave their own webring. Delete it instead.', data: null },
        { status: 400 }
      );
    }

    await WebringModel.removeMember(id, userId);

    return NextResponse.json({
      data: { message: 'Successfully left webring' },
      error: null
    });
  } catch (error) {
    console.error('Error leaving webring:', error);
    return NextResponse.json(
      { error: 'Failed to leave webring', data: null },
      { status: 500 }
    );
  }
}
