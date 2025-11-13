import { NextRequest, NextResponse } from 'next/server';
import { WebringModel } from '@/db/models/webring';
import { requireAuth } from '@/lib/auth';

// GET /api/webrings/[id] - Get webring details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    const members = await WebringModel.getMembers(id);

    return NextResponse.json({
      data: { ...webring, members },
      error: null
    });
  } catch (error) {
    console.error('Error fetching webring:', error);
    return NextResponse.json(
      { error: 'Failed to fetch webring', data: null },
      { status: 500 }
    );
  }
}

// DELETE /api/webrings/[id] - Delete webring (creator only)
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

    // Only the creator can delete the webring
    if (webring.creator_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden - only the creator can delete this webring', data: null },
        { status: 403 }
      );
    }

    await WebringModel.delete(id);

    return NextResponse.json({
      data: { message: 'Webring deleted successfully' },
      error: null
    });
  } catch (error) {
    console.error('Error deleting webring:', error);
    return NextResponse.json(
      { error: 'Failed to delete webring', data: null },
      { status: 500 }
    );
  }
}
