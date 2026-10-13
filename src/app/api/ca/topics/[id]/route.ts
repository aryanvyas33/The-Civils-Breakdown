import { NextRequest, NextResponse } from 'next/server';
import { getTopicById } from '@/lib/ca-topics';

/**
 * GET /api/ca/topics/[id]
 * Returns a single CA Priority topic by its persistent integer ID.
 */
export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = parseInt(params.id, 10);

    if (isNaN(topicId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid topic ID format. Must be an integer.' },
        { status: 400 }
      );
    }

    const topic = getTopicById(topicId);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: `Topic with ID ${topicId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, topic },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error(`[API /api/ca/topics/${params.id}] Error:`, error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
