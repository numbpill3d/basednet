import { NextRequest, NextResponse } from 'next/server';
import { WebringModel } from '@/db/models/webring';
import { requireAuth } from '@/lib/auth';
import { createWebringSchema, validateBody } from '@/lib/validation';

// GET /api/webrings - List all webrings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const webrings = await WebringModel.list(limit, offset);

    return NextResponse.json({
      data: webrings,
      error: null
    });
  } catch (error) {
    console.error('Error fetching webrings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch webrings', data: null },
      { status: 500 }
    );
  }
}

// POST /api/webrings - Create a new webring
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const userId = (session.user as any)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', data: null },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input
    const validation = validateBody(createWebringSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error, data: null },
        { status: 400 }
      );
    }

    const { name, description } = validation.data;
    const webring = await WebringModel.create(name, description, userId);

    // Automatically add the creator as the first member
    await WebringModel.addMember(webring.id, userId);

    return NextResponse.json({
      data: webring,
      error: null
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating webring:', error);
    return NextResponse.json(
      { error: 'Failed to create webring', data: null },
      { status: 500 }
    );
  }
}
