export interface Paper {
  id: string;               // "gs1", "gs2", "gs3", "gs4", "essay"
  number: number;           // 1, 2, 3, 4, 5
  title: string;            // Full title
  shortTitle: string;       // Short concise title
  description: string;
  color: string;            // hex color code
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  borderLeftClass: string;
  icon: string;
  totalQuestions: number;
  subjectIds: string[];
}

export interface Subject {
  id: string;               // "gs1-her", "gs2-con", "ess-phi", etc.
  code: string;             // "GS1-HER", "ESS-PHI"
  name: string;             // "Indian Heritage & Culture"
  paperId: string;          // "gs1", "essay"
  paperNumber: number;
  description: string;
  keywords: string[];
}

export interface Question {
  id: string;               // "gs1-2024-q1"
  text: string;             // Question statement
  year: number;             // 2013 - 2024
  paperId: string;          // "gs1" | "gs2" | "gs3" | "gs4" | "essay"
  paperNumber: number;      // 1 | 2 | 3 | 4 | 5
  subjectId: string;        // "gs1-her"
  subjectName: string;      // "Indian Heritage & Culture"
  pointerId?: string;       // "gs2-con-fed" - Maps to syllabus pointer
  marks: number;            // 10 | 15 | 20 | 125
  questionNumber: number;   // 1 - 20, or 1 - 8 for essay
  tags: string[];           // ["Gandhara Art", "Buddhist Art"]
  keywords: string[];       // extracted search terms
  wordCount: number;        // word count of the question statement
  section?: 'A' | 'B';      // for Essay Paper (Sec A: Abstract, Sec B: Applied)
  isCurrentAffair?: boolean; // Flag indicating if question is tied to contemporary events
  currentAffairsContext?: string; // Specific contemporary trigger/event
  staticCore?: string[];    // Core static syllabus concepts underlying the current affair
}

export interface SyllabusPointer {
  id: string;
  label: string;
  subjectId: string;
  paperId: string;
  officialText: string;
  keywords: string[];
}

export interface SearchResult {
  question: Question;
  relevanceScore: number;
  matchedKeywords: string[];
  highlightedText: string;
}

export interface RelatedQuestion {
  question: Question;
  relevanceLevel: 'directly_related' | 'high' | 'moderate' | 'low';
  matchingTags: string[];
  matchingKeywords: string[];
  score: number;
  matchReason?: string;
}

export interface FilterOptions {
  paper?: string | null;
  subject?: string | null;
  pointerId?: string | null;
  year?: number | null;
  tag?: string | null;
  directive?: string | null;
  sortBy?: 'relevance' | 'year-desc' | 'year-asc' | 'marks-desc';
}


export * from './deconstruction';
export * from './currentAffairs';

