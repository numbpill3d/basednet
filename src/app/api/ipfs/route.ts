import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '../../../lib/auth';
import { IpfsContentModel } from '../../../db/models/ipfs-content';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const content = await IpfsContentModel.findByUser(user.id, limit, offset);
    const stats = await IpfsContentModel.getContentStats(user.id);

    return NextResponse.json({ content, stats });
  } catch (error) {
    console.error('Error fetching IPFS content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch IPFS content' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { cid, contentType, filename, size } = data;

    if (!cid) {
      return NextResponse.json(
        { error: 'CID is required' },
        { status: 400 }
      );
    }

    const content = await IpfsContentModel.create(
      user.id,
      cid,
      contentType,
      filename,
      size
    );

    return NextResponse.json({ content }, { status: 201 });
  } catch (error) {
    console.error('Error creating IPFS content:', error);
    return NextResponse.json(
      { error: 'Failed to create IPFS content' },
      { status: 500 }
    );
  }
}
