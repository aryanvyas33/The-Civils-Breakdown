import { NextRequest, NextResponse } from 'next/server';
import {
  getAllTopics,
  getTopicsSummaryStats,
} from '@/lib/ca-topics';
import { GSPaper, CABand } from '@/types';

/**
 * GET /api/ca/topics
 * Query Parameters:
 *   - paper: 'GS1' | 'GS2' | 'GS3' | 'GS4' (filters topics linked to this paper)
 *   - band: 'bandA' | 'bandB' | 'bandC'
 *   - tier: 'Tier 1' | 'Tier 2'
 *   - hasUpdate: 'true' | 'false' (filters topics with subsequent monthly developments)
 *   - summary: 'true' (returns dataset metadata & counts)
 */
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const summaryOnly = searchParams.get('summary') === 'true';

    if (summaryOnly) {
      const summary = getTopicsSummaryStats();
      return NextResponse.json({
        success: true,
        summary,
      });
    }

    let topics = getAllTopics();

    // 1. Filter by GS Paper
    const paper = searchParams.get('paper')?.toUpperCase() as GSPaper | undefined;
    if (paper && ['GS1', 'GS2', 'GS3', 'GS4'].includes(paper)) {
      topics = topics.filter((t) => t.papers.includes(paper));
    }

    // 2. Filter by Band
    const band = searchParams.get('band') as CABand | undefined;
    if (band && ['bandA', 'bandB', 'bandC'].includes(band)) {
      topics = topics.filter((t) => t.band === band);
    }

    // 3. Filter by Tier
    const tier = searchParams.get('tier');
    if (tier) {
      topics = topics.filter((t) => t.tier.toLowerCase() === tier.toLowerCase());
    }

    // 4. Filter by presence of subsequent developments
    const hasUpdate = searchParams.get('hasUpdate');
    if (hasUpdate === 'true') {
      topics = topics.filter((t) => Boolean(t.recentUpdate));
    } else if (hasUpdate === 'false') {
      topics = topics.filter((t) => !t.recentUpdate);
    }

    return NextResponse.json({
      success: true,
      count: topics.length,
      topics,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[API /api/ca/topics] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
