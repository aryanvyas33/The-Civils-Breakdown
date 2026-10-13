import cardBadgesData from '@/data/card-badges.json';

export interface CardBadge {
  directiveWord?: string;
  primaryAnchor?: string;
  microThemes?: string[];
  coreConcepts?: string[];
  stakeholders?: string[];
}

const cardBadges: Record<string, CardBadge> = cardBadgesData as Record<string, CardBadge>;

/**
 * Fast O(1) lookup of lightweight question badge metadata.
 * Does not bundle the massive ai-deconstructions.json (3.79 MB).
 */
export function getQuestionCardBadges(questionId: string): CardBadge | null {
  if (!questionId) return null;
  return cardBadges[questionId.toLowerCase().trim()] || null;
}

/**
 * Returns key-value dictionary of all question badges for search and facets.
 */
export function getAllQuestionCardBadges(): Record<string, CardBadge> {
  return cardBadges;
}
