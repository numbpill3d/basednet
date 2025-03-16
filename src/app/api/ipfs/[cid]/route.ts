import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, hasPermission } from '../../../../lib/auth';
import { IpfsContentModel } from '../../../../db/models/ipfs-content';

export async function GET(
  req: NextRequest,
  { params }: { params: { cid: string } }
) {
  try {
    const { cid } = params;
    const content = await IpfsContentModel.findByCid(cid);

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching IPFS content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch IPFS content' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { cid: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cid } = params;
    const data = await req.json();
    const { pinned } = data;

    if (pinned === undefined) {
      return NextResponse.json(
        { error: 'No valid update fields provided' },
        { status: 400 }
      );
    }

    // Check if content exists and belongs to user
    const existingContent = await IpfsContentModel.findByCid(cid);
    if (!existingContent) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    if (!(await hasPermission(user.id, existingContent.user_id))) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const content = await IpfsContentModel.setPinStatus(cid, pinned);
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error updating IPFS content:', error);
    return NextResponse.json(
      { error: 'Failed to update IPFS content' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { cid: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cid } = params;

    // Check if content exists and belongs to user
    const existingContent = await IpfsContentModel.findByCid(cid);
    if (!existingContent) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    if (!(await hasPermission(user.id, existingContent.user_id))) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const success = await IpfsContentModel.delete(cid, user.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete content' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting IPFS content:', error);
    return NextResponse.json(
      { error: 'Failed to delete IPFS content' },
      { status: 500 }
    );
  }
}
