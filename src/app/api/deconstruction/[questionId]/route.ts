import { NextRequest, NextResponse } from 'next/server';
import { getCuratedDeconstruction, adaptRawDeconstruction } from '@/lib/questionDeconstruction';
import { getAIDeconstruction, adaptAIDeconstructionToLegacy } from '@/lib/aiDeconstruction';
import { getQuestionById } from '@/lib/data';
import { DeconstructionApiResponse } from '@/types/deconstruction';

let cachedRawDeconstructions: Record<string, any> | null = null;

function getRawDeconstructions(): Record<string, any> {
  if (cachedRawDeconstructions) return cachedRawDeconstructions;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cachedRawDeconstructions = require('@/data/deconstructions.json');
    return cachedRawDeconstructions || {};
  } catch (err) {
    console.error('[DeconstructionAPI] Failed to load deconstructions.json:', err);
    return {};
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  const questionId = params.questionId?.toLowerCase();
  if (!questionId) {
    return NextResponse.json({ error: 'Missing questionId parameter' }, { status: 400 });
  }

  const question = getQuestionById(questionId);
  const aiItem = getAIDeconstruction(questionId);

  const cacheHeaders = {
    'Cache-Control': 'public, max-age=31536000, immutable',
  };

  // 1. Check if curated high-detail blueprint exists
  const curated = getCuratedDeconstruction(questionId);
  if (curated) {
    const payload: DeconstructionApiResponse = {
      source: 'curated',
      data: aiItem || null,
      deconstruction: curated,
    };
    return NextResponse.json(payload, { headers: cacheHeaders });
  }

  // 2. Check modern AI deconstruction dataset (1,131 questions)
  if (aiItem) {
    const adapted = adaptAIDeconstructionToLegacy(aiItem, question);
    const payload: DeconstructionApiResponse = {
      source: 'ai_generated',
      data: aiItem,
      deconstruction: adapted,
    };
    return NextResponse.json(payload, { headers: cacheHeaders });
  }

  // 3. Fallback to precomputed structural dataset if available
  const rawMap = getRawDeconstructions();
  const raw = rawMap[questionId];
  if (raw) {
    const adapted = adaptRawDeconstruction(raw, question);
    const payload: DeconstructionApiResponse = {
      source: 'computed',
      data: null,
      deconstruction: adapted,
    };
    return NextResponse.json(payload, { headers: cacheHeaders });
  }

  // 4. Fallback synthesis from question data
  if (question) {
    const synthesized = adaptRawDeconstruction(null, question);
    const payload: DeconstructionApiResponse = {
      source: 'synthesized',
      data: null,
      deconstruction: synthesized,
    };
    return NextResponse.json(payload, { headers: cacheHeaders });
  }

  return NextResponse.json({ error: 'Question not found' }, { status: 404 });
}
