import { AIDeconstructionItem } from '@/types/deconstruction';
import { DeconstructionData } from '@/lib/questionDeconstruction';

let cachedAIDeconstructionMap: Map<string, AIDeconstructionItem> | null = null;
let cachedAIDeconstructionRecord: Record<string, AIDeconstructionItem> | null = null;

function initAIDeconstructions(): {
  map: Map<string, AIDeconstructionItem>;
  record: Record<string, AIDeconstructionItem>;
} {
  if (cachedAIDeconstructionMap && cachedAIDeconstructionRecord) {
    return { map: cachedAIDeconstructionMap, record: cachedAIDeconstructionRecord };
  }

  const map = new Map<string, AIDeconstructionItem>();
  const record: Record<string, AIDeconstructionItem> = {};

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const rawData = require('@/data/ai-deconstructions.json');
    if (Array.isArray(rawData)) {
      for (let i = 0; i < rawData.length; i++) {
        const item: AIDeconstructionItem = rawData[i];
        if (item && item.question_id) {
          const key = item.question_id.toLowerCase().trim();
          map.set(key, item);
          record[key] = item;
        }
      }
    }
  } catch (err) {
    console.error('[AIDeconstruction] Failed to load ai-deconstructions.json:', err);
  }

  cachedAIDeconstructionMap = map;
  cachedAIDeconstructionRecord = record;
  return { map, record };
}

/**
 * Fast O(1) lookup of AI deconstruction by question ID
 */
export function getAIDeconstruction(questionId: string): AIDeconstructionItem | null {
  if (!questionId) return null;
  const { map } = initAIDeconstructions();
  return map.get(questionId.toLowerCase().trim()) || null;
}

/**
 * Checks if AI deconstruction exists for a question
 */
export function hasAIDeconstruction(questionId: string): boolean {
  if (!questionId) return null as unknown as boolean;
  const { map } = initAIDeconstructions();
  return map.has(questionId.toLowerCase().trim());
}

/**
 * Returns complete key-value dictionary of all AI deconstructions
 */
export function getAllAIDeconstructions(): Record<string, AIDeconstructionItem> {
  const { record } = initAIDeconstructions();
  return record;
}

/**
 * Adapts AIDeconstructionItem into the legacy DeconstructionData format
 * to ensure 100% backwards compatibility with existing UI components.
 */
export function adaptAIDeconstructionToLegacy(
  ai: AIDeconstructionItem,
  question?: { text: string; marks: number; tags?: string[]; subjectName?: string }
): DeconstructionData {
  const marks = question?.marks || 15;
  const is15M = marks >= 15;

  // 1. Directives
  const directives = [
    {
      phrase: (ai.deconstruction.directive.word || 'EXAMINE').toUpperCase(),
      task: ai.deconstruction.directive.demand_of_the_question || 'Address core question demands analytically.',
    },
  ];

  // 2. Primary Entities
  const entityClasses = [
    'bg-purple-50 text-purple-800 border-purple-200',
    'bg-blue-50 text-blue-800 border-blue-200',
    'bg-emerald-50 text-emerald-800 border-emerald-200',
    'bg-amber-50 text-amber-800 border-amber-200',
  ];

  const primaryEntities = (ai.deconstruction.core_concepts || []).slice(0, 3).map((concept, idx) => ({
    role: idx === 0 ? 'Core Theoretical Concept' : idx === 1 ? 'Applied Concept' : 'Thematic Linkage',
    label: concept,
    tagClass: entityClasses[idx % entityClasses.length],
  }));

  if (ai.stakeholders && ai.stakeholders.length > 0) {
    primaryEntities.push({
      role: 'Key Stakeholder',
      label: ai.stakeholders[0],
      tagClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    });
  }

  // 3. Scope Limiters
  const scopeLimiters = [];
  if (ai.taxonomy_mapping?.primary_anchor) {
    scopeLimiters.push({
      phrase: 'Syllabus Anchor',
      constraint: `Anchored to ${ai.taxonomy_mapping.primary_anchor}${
        ai.taxonomy_mapping.micro_themes?.length ? ` (${ai.taxonomy_mapping.micro_themes.slice(0, 2).join(', ')})` : ''
      }.`,
    });
  }

  scopeLimiters.push({
    phrase: 'Prescribed Scope',
    constraint: `Strict adherence to ${is15M ? '250 words (15 Marks)' : '150 words (10 Marks)'} with balanced empirical and analytical grounding.`,
  });

  // 4. What is asked
  const whatIsAsked = (ai.deconstruction.dimensions_asked || []).map((dim, idx) => `${idx + 1}. ${dim}`);

  // 5. What to write
  const whatToWrite = [];

  // Introduction
  whatToWrite.push({
    heading: 'Introduction: Conceptual Context & Definition',
    wordCount: is15M ? '~35-40 words (15%)' : '~20-25 words (15%)',
    points: [
      `Introduce and define key concepts: ${(ai.deconstruction.core_concepts || []).join(', ')}.`,
      ...(ai.relatability_hooks && ai.relatability_hooks.length > 0
        ? [`Contextual relevance: ${ai.relatability_hooks[0]}`]
        : []),
    ],
  });

  // Body sections from note_making_dimensions
  if (ai.note_making_dimensions && ai.note_making_dimensions.length > 0) {
    ai.note_making_dimensions.forEach((dim) => {
      whatToWrite.push({
        heading: `Body: ${dim.dimension_type}`,
        wordCount: is15M ? '~60-70 words (25%)' : '~35-45 words (25%)',
        points: dim.extraction && dim.extraction.length > 0 ? dim.extraction : ['Address this dimension with specific examples and constitutional/policy backing.'],
      });
    });
  }

  // Conclusion / Way Forward
  const conclusionPoints = [
    'Synthesize arguments with constitutional values, administrative efficacy, and long-term policy solutions.',
  ];
  if (ai.stakeholders && ai.stakeholders.length > 1) {
    conclusionPoints.push(`Balance interests of key stakeholders: ${ai.stakeholders.slice(0, 3).join(', ')}.`);
  }

  whatToWrite.push({
    heading: 'Conclusion: Way Forward & Balanced Synthesis',
    wordCount: is15M ? '~25-30 words (10%)' : '~15-20 words (10%)',
    points: conclusionPoints,
  });

  return {
    directives,
    primaryEntities,
    scopeLimiters,
    whatIsAsked,
    whatToWrite,
  };
}
