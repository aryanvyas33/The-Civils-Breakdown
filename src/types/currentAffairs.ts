/**
 * Current Affairs Priority Tracker Types & Data Contracts
 * The Civils Breakdown — Mains 2027 Model
 */

export type GSPaper = 'GS1' | 'GS2' | 'GS3' | 'GS4';

export type CABand = 'bandA' | 'bandB' | 'bandC';

export type EffortLevel = 'DEEP DIVE' | 'QUICK READ' | 'SKIM' | string;

/**
 * Metadata for subsequent monthly developments on an existing theme.
 * Keeps a single master dossier instead of creating duplicate cards.
 */
export interface CATopicUpdate {
  month: string;           // e.g. "Sep 2026"
  tag: string;             // e.g. "PERSISTENCE BOOSTED (RANK #1 HELD)" or "NEW STATUTORY REGULATION"
  text: string;            // 1-2 sentence core development summary
}

/**
 * A single Current Affairs Priority Topic.
 * Model cycle: January - September 2026 (76 themes total).
 */
export interface CATopic {
  id: number;
  rank: number;             // Overall priority rank 1–76
  paperRank: number;        // Rank within primary GS paper
  month: string;            // e.g. "Apr 2026"
  monthShort: string;       // e.g. "Apr"
  title: string;
  primaryPaper: GSPaper;
  papers: GSPaper[];        // All linked GS papers
  selectedPaper?: GSPaper;  // Interactive UI switcher state
  band: CABand;             // bandA (Must Cover) | bandB (Quick Read) | bandC (Headline)
  effort: EffortLevel;
  prob: string;             // Calibrated logistic probability, e.g. "81.8%"
  index: number;            // 8-parameter priority score (0–100)
  tier: string;             // "Tier 1" | "Tier 2"
  prepDepth: string;        // Study instruction
  staticCore: string;       // Syllabus static core concepts
  syllabusPointers: Partial<Record<GSPaper, string>>;
  paperAngles: Partial<Record<GSPaper, string>>;
  recentUpdate?: CATopicUpdate;
}

/**
 * Weighted progress scoring formula constants.
 * Band A = 1.0 pt, Quick Reads (Band B & C) = 0.5 pt. Total = 60.5 pts.
 */
export const CA_WEIGHTS = {
  bandA: 1.0,
  bandBandC: 0.5,
  totalPts: 60.5,
  bandATarget: 45,
  quickReadsTarget: 31,
} as const;

/**
 * Persistent progress state stored in client storage (e.g. localStorage).
 */
export interface CAProgressState {
  doneSet: number[];        // Completed topic IDs (Band A)
  quickDoneSet: number[];   // Completed topic IDs (Band B / C)
  updateDoneSet: number[];  // Reviewed delta update IDs
  lastUpdated?: string;     // ISO timestamp
}

/**
 * Live calculated metrics for the CA Progress Bar.
 */
export interface CAProgressMetrics {
  pts: number;              // Current weighted points e.g. 18.5
  maxPts: number;           // Target total points (60.5)
  pct: number;              // Percentage (0–100)
  bandADone: number;        // Count of Band A completed
  bandATotal: number;       // 45
  quickDone: number;        // Count of Quick Reads completed
  quickTotal: number;       // 31
  updatesDone: number;      // Count of reviewed updates
  updatesTotal: number;     // Total updates available in the dataset
}

/** Filter options for the CA tracker view */
export type CAPaperFilter = 'all' | GSPaper;
export type CATierFilter = 'all' | 'bandA' | 'quickReads' | 'hasUpdates';
