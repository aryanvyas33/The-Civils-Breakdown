import { NextRequest, NextResponse } from 'next/server';
import { getRelatedQuestionsServer } from '@/lib/relatedServer';

export async function GET(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  const questionId = params.questionId?.toLowerCase();
  if (!questionId) {
    return NextResponse.json({ error: 'Missing questionId parameter' }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '8', 10);

  const related = getRelatedQuestionsServer(questionId, limit);

  return NextResponse.json(related, {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
