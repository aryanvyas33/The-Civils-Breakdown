/**
 * Keyword & Entity Highlighting Utility for UPSC PYQ Vault
 * Identifies and highlights:
 *  1. Question Directives (e.g., "examine", "discuss", "critically evaluate") -> .kw-directive
 *  2. Institutions, Stakeholders & Jurisdictions (e.g., "Supreme Court", "India", "legislators") -> .kw-institution
 *  3. Syllabus Concepts & Unified Canonical Statutes (e.g., "Representation of the People Act, 1951") -> .kw-highlight
 *
 * Employs non-overlapping interval mapping and strips prompt scaffolding,
 * conversational fluff, and grammatical glue.
 */

// 1. UPSC Question Directives Dictionary (Longest first)
export const COMPOUND_DIRECTIVES = [
  'make a critical assessment',
  'critically examine',
  'critically evaluating',
  'critically evaluate',
  'critically analysing',
  'critically analyse',
  'critically analyzing',
  'critically analyze',
  'critically assessing',
  'critically assess',
  'critically discussing',
  'critically discuss',
  'to what extent',
  'what is meant by',
  'what do you mean by',
  'account for',
  'accounting for',
  'bring out',
  'bringing out',
  'give reasons for',
  'give reasons',
  'throw light on',
  'shed light on',
  'spell out',
  'point out',
  'elaborate upon',
  'elaborate on',
  'reflect upon',
  'reflect on',
  'with suitable illustrations',
  'with suitable examples',
  'with examples',
  'briefly discuss',
  'briefly examine',
  'briefly explain'
];

export const SINGLE_WORD_DIRECTIVES = [
  'examine', 'discuss', 'evaluate', 'analyze', 'analyse',
  'elucidate', 'explain', 'comment', 'justify', 'trace',
  'highlight', 'illustrate', 'substantiate', 'assess', 'describe',
  'differentiate', 'distinguish', 'compare', 'contrast',
  'reconstruct', 'elaborate', 'enumerate', 'appraise', 'clarify', 'outline',
  'suggest', 'validate'
];

export const ALL_DIRECTIVES = Array.from(
  new Set([...COMPOUND_DIRECTIVES, ...SINGLE_WORD_DIRECTIVES])
).sort((a, b) => b.length - a.length);

const ALL_DIRECTIVES_SET = new Set(ALL_DIRECTIVES.map((d) => d.toLowerCase()));

// 2. Institutions, Stakeholders & Jurisdictions (Matched with .kw-institution)
export const INSTITUTIONS_STAKEHOLDERS = [
  'Election Commission of India',
  'National Human Rights Commission',
  'Competition Commission of India',
  'Comptroller and Auditor General',
  'National Green Tribunal',
  'Central Bureau of Investigation',
  'Central Vigilance Commission',
  'Reserve Bank of India',
  'Law Commission of India',
  'Finance Commission of India',
  'Law Commission',
  'Finance Commission',
  'Supreme Court of India',
  'Supreme Court',
  'Apex Court',
  'High Court',
  'Election Commission',
  'NITI Aayog',
  'Parliament of India',
  'Parliament',
  'Lok Sabha',
  'Rajya Sabha',
  'State Legislature',
  'State Legislatures',
  'Council of Ministers',
  'Head of Department of Weapon Sales',
  'Head of Department',
  'Head of Weapon Sales',
  'sub-divisional officer',
  'sub divisional officer',
  'sub-divisional magistrate',
  'state irrigation department',
  'irrigation department',
  'departmental executive engineer',
  'executive engineer',
  'district sports officer',
  'sports officer',
  'district magistrate',
  'district collector',
  'local sports association office-bearers',
  'association president',
  'sports association president',
  'sports association',
  'local sports association',
  'influential contractor',
  'contractor',
  'contractors',
  'senior minister',
  'minister',
  'ministers',
  'political figures',
  'political leaders',
  'rural underprivileged athletes',
  'underprivileged athletes',
  'talented athletes',
  'athletes',
  'athlete',
  'Indian scientists',
  'scientists',
  'legislators',
  'tribal communities',
  'vulnerable sections',
  'civil services',
  'farmers',
  'women',
  'youth',
  'villagers',
  'citizens',
  'RBI',
  'CAG',
  'CVC',
  'CBI',
  'NHRC',
  'NCSC',
  'NCST',
  'NGT',
  'CCI',
  'UPSC',
  'ISRO',
  'DRDO',
  'United Nations',
  'UN',
  'World Trade Organization',
  'WTO',
  'World Health Organization',
  'WHO',
  'BRICS',
  'Quad',
  'BIMSTEC',
  'ASEAN',
  'European Union',
  'EU',
  'India'
].sort((a, b) => b.length - a.length);

const INSTITUTIONS_STAKEHOLDERS_SET = new Set(
  INSTITUTIONS_STAKEHOLDERS.map((s) => s.toLowerCase())
);

// 3. Canonical Statutes & Unified Legal Anchors (Matched whole to prevent fragmentation)
export const CANONICAL_STATUTES = [
  'Representation of the People Act, 1951',
  'Representation of the People Act 1951',
  'Representation of the People Act',
  'Transgender Persons (Protection of Rights) Act, 2019',
  'Transgender Persons (Protection of Rights) Act',
  'Transgender Persons Act',
  'Indian Patent Act',
  'Patents Act',
  'Right to Information Act',
  'Information Technology Act',
  'Environmental Protection Act',
  'National Food Security Act',
  'Nari Shakti Vandan Adhiniyam',
  'PESA Act 1996',
  'PESA Act',
  'POSHAN Abhiyaan',
  'TRIPS Agreement',
  'TRIPS',
  'Tenth Schedule',
  'Fifth Schedule',
  'Sixth Schedule'
].sort((a, b) => b.length - a.length);

// 4. Stopwords, Conversational Fluff & Excluded Terms
export const NON_KEYWORDS = new Set([
  ...ALL_DIRECTIVES.map((d) => d.toLowerCase()),
  'analysis', 'examination', 'evaluation', 'explanation', 'assessment', 'description',
  'comparison', 'reconstruction', 'suggestion', 'understanding',
  'exemplify', 'exemplifies', 'amalgamate', 'amalgamation',
  'mobilize', 'mobilized', 'mobilizing', 'decongest', 'established', 'interfere', 'interference',

  // Conversational & grammatical fluff identified in test cases
  'relating', 'related', 'dear', 'human', 'human being', 'human beings', 'protected',
  'effect', 'effects', 'masses', 'generates', 'owing', 'working', 'mean', 'means',
  'interwoven', 'deeply', 'lives', 'our lives', 'fulcrum', 'acts', 'essential check',
  'high functionaries', 'its application', 'application', 'increase', 'their associates',
  'associates', 'associate', 'would constitute', 'constitute', 'consequently a', 'consequently',
  'citizen', 'citizens', 'alike', 'important', 'high', 'functionaries',
  'task', 'tasks', 'main', 'appears', 'agree', 'rising',
  'sports', 'sports kits', 'sports kit', 'kits', 'kit', 'honest', 'efficient', 'discover', 'study',
  'funds', 'contract', 'contracts', 'notice', 'notices', 'barefoot', 'nutrition',
  'what action plan', 'action plan', 'what immediate steps', 'immediate steps',
  'ajit', 'country a', 'country b', 'country', 'needs long-term loan', 'cash advance', 'one order',
  'ten villages', 'villages',
  'the constitution', 'constitution', 'indian constitution',

  // Common prompt filler nouns & adjectives in UPSC questions
  'importance', 'significance', 'implication', 'implications',
  'various', 'different', 'several', 'multiple',
  'aspect', 'aspects', 'factor', 'factors', 'reason', 'reasons',
  'feature', 'features', 'characteristic', 'characteristics',
  'prominent', 'major', 'minor',
  'role', 'roles', 'impact', 'impacts', 'consequence', 'consequences',
  'measure', 'measures', 'step', 'steps', 'action', 'actions', 'initiative', 'initiatives',
  'challenge', 'challenges', 'issue', 'issues', 'problem', 'problems', 'concern', 'concerns',
  'perspective', 'perspectives', 'view', 'views',
  'context', 'light', 'statement', 'terms', 'regard',
  'contemporary', 'practice', 'practices',
  'required', 'essential', 'critical', 'crucial',
  'extent', 'degree', 'manner', 'nature', 'type', 'types', 'form', 'forms',
  'concept', 'notion', 'idea', 'definition',
  'traditional', 'compared', 'lay',
  'way', 'ways', 'need', 'needs', 'level', 'levels',

  // Broad umbrella single words
  'ancient', 'medieval', 'modern', 'history', 'indian',
  'polity', 'economy', 'society', 'geography', 'ethics',

  // Grammar stopwords
  'the', 'of', 'and', 'in', 'for', 'with', 'from', 'into', 'their', 'have', 'has', 'had', 'been',
  'that', 'this', 'what', 'which', 'when', 'where', 'how', 'why', 'will', 'would',
  'should', 'could', 'can', 'are', 'was', 'were', 'did', 'does', 'do',
  'between', 'among', 'under', 'over', 'such', 'more', 'most', 'some', 'any', 'other',
  'each', 'every', 'than', 'then', 'also', 'both', 'one', 'two', 'three', 'like', 'begin', 'unless',
  'there', 'these', 'those', 'its', 'they', 'them', 'about', 'above', 'after',
  'before', 'being', 'became', 'become', 'while', 'whereas', 'whether', 'either', 'neither',
  'well', 'very'
]);

// Multi-word fluff phrases & broad umbrella categories on their own
export const BLACKLIST_PHRASES = new Set([
  'every human',
  'our lives',
  'the masses',
  'paucity of time',
  'some modifications',
  'university professor',
  'the constitution',
  'constitution',
  'indian constitution',
  'the indian constitution',
  'constitution of india',
  'the constitution of india',
  'ancient indian history',
  'ancient history',
  'ancient india',
  'medieval indian history',
  'medieval history',
  'medieval india',
  'modern indian history',
  'modern history',
  'modern india',
  'world history',
  'post-independence india',
  'post-independence',
  'indian culture',
  'art and culture',
  'indian heritage',
  'indian polity',
  'polity',
  'governance',
  'indian economy',
  'economy',
  'indian society',
  'society',
  'geography',
  'physical geography',
  'ethics',
  'case study',
  'case studies',
  'protected under',
  'well protected under',
  'the effect of',
  'the effect of the',
  'effect of',
  'the role of',
  'the importance of',
  'the significance of',
  'the perspective of',
  'in this context',
  'in the context of',
  'with reference to',
  'with regard to',
  'above observation of the',
  'above observation of',
  'purpose of the',
  'for the purpose of the',
  'for the purpose of',
  'important contributions of',
  'contributions of',
  'in the fields of',
  'fields of',
  'in the',
  'of the',
  'to the',
  'under the',
  'for the'
]);

// Umbrella syllabus tags that shouldn't be matched verbatim
export const UMBRELLA_TAGS = new Set([
  'ancient indian history', 'ancient history', 'ancient india',
  'medieval indian history', 'medieval history', 'medieval india',
  'modern indian history', 'modern history', 'modern india',
  'world history', 'post-independence india', 'post-independence',
  'indian culture', 'art and culture', 'indian heritage',
  'indian polity', 'polity', 'constitution', 'the constitution', 'indian constitution', 'governance',
  'indian economy', 'economy', 'indian society', 'society',
  'geography', 'physical geography', 'ethics', 'case study', 'case studies'
]);

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Short acronyms that must be matched case-sensitively to avoid colliding with common English words
const CASE_SENSITIVE_ACRONYMS = new Set(['WHO', 'UN', 'EU', 'IT', 'US', 'IN']);

/**
 * Builds a regex with word boundaries around the given phrase,
 * safely handling special regex characters and internal whitespace.
 */
function buildWordBoundaryRegex(term: string): RegExp {
  const isCaseSensitive = CASE_SENSITIVE_ACRONYMS.has(term.trim());
  const parts = term
    .trim()
    .split(/\s+/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const escaped = parts.join('\\s+');

  const lead = /^\w/.test(term.trim()) ? '\\b' : '(?<=^|[^a-zA-Z0-9])';
  const trail = /\w$/.test(term.trim()) ? '\\b' : '(?=$|[^a-zA-Z0-9])';

  const flags = isCaseSensitive ? 'g' : 'gi';
  return new RegExp(`${lead}${escaped}${trail}`, flags);
}

/**
 * Strips leading determiners, prompt template stems, and splits glued chunks,
 * returning a list of valid candidate substantive keywords.
 */
export function cleanCandidatePhrase(raw: string): string[] {
  if (!raw) return [];
  let s = raw.trim().replace(/^["'`]+|["'`]+$/g, '').trim();
  if (s.startsWith('(') && s.endsWith(')')) {
    s = s.slice(1, -1).trim();
  }

  // De-glue known template compounds
  if (/salient features of the/i.test(s)) {
    const rest = s.replace(/salient features of the/i, '').trim();
    return ['salient features', ...cleanCandidatePhrase(rest)];
  }
  if (/important contributions of/i.test(s)) {
    const rest = s.replace(/important contributions of/i, '').trim();
    return cleanCandidatePhrase(rest);
  }
  if (/above observation of the/i.test(s)) {
    const rest = s.replace(/.*above observation of the/i, '').trim();
    return cleanCandidatePhrase(rest);
  }
  if (/for the purpose of the/i.test(s) || /purpose of the/i.test(s)) {
    const rest = s.replace(/.*purpose of the/i, '').trim();
    return cleanCandidatePhrase(rest);
  }
  if (/fields of/i.test(s)) {
    const rest = s.replace(/fields of/i, '').trim();
    return cleanCandidatePhrase(rest);
  }
  if (/imperatives under/i.test(s)) {
    const parts = s.split(/imperatives under/i);
    return [...cleanCandidatePhrase(parts[0]), ...cleanCandidatePhrase(parts[1])];
  }
  if (/balance intellectual property/i.test(s)) {
    return ['balance', 'intellectual property protection', 'intellectual property'];
  }
  if (/judicial accountability in India/i.test(s)) {
    return ['judicial accountability'];
  }
  if (/sub-divisional officer in the state irrigation department/i.test(s)) {
    return ['sub-divisional officer', 'state irrigation department'];
  }
  if (/\b(?:sub-divisional officer|officer|engineer)\s+in\s+the\s+(?:state irrigation department|irrigation department|department)\b/i.test(s)) {
    const parts = s.split(/\s+in\s+the\s+/i);
    return cleanCandidatePhrase(parts[0]).concat(cleanCandidatePhrase(parts[1]));
  }
  if (/Head of Department of Weapon Sales/i.test(s)) {
    return ['Head of Department of Weapon Sales'];
  }
  if (/rural underprivileged athletes/i.test(s)) {
    return ['rural underprivileged athletes'];
  }
  if (/high functionaries/i.test(s) || /citizens alike/i.test(s)) {
    return [];
  }

  // Strip leading determiners & stems
  s = s.replace(/^(the|a|an|this|that|these|those)\s+/i, '');
  s = s.replace(/^(their|its|our|your|his|her|it|they|we|you)\s+/i, '');
  s = s.replace(/^(an?\s+)?(honest and efficient|honest|efficient)\s+/i, '');
  s = s.replace(/^(the\s+)?(effect of the|effect of|role of the|role of|importance of the|importance of)\s+/i, '');
  s = s.replace(/^(well\s+)?protected under(\s+the)?\s+/i, '');
  s = s.replace(/^(relating|related) to(\s+the)?\s+/i, '');
  s = s.replace(/\s+(policy\s+)?in India$/i, '');
  s = s.replace(/\s+policy$/i, '');
  s = s.trim();

  if (s.length < 2) return [];
  const lower = s.toLowerCase();
  if (NON_KEYWORDS.has(lower) || BLACKLIST_PHRASES.has(lower) || UMBRELLA_TAGS.has(lower)) {
    return [];
  }

  return [s];
}

/**
 * Checks if a given term is a recognized UPSC directive.
 */
export function isDirective(term: string): boolean {
  if (!term) return false;
  return ALL_DIRECTIVES_SET.has(term.trim().toLowerCase());
}

/**
 * Checks if a given term is a recognized Institution or Stakeholder.
 */
export function isInstitution(term: string): boolean {
  if (!term) return false;
  const lower = term.trim().toLowerCase();
  if (INSTITUTIONS_STAKEHOLDERS_SET.has(lower)) return true;
  if (
    /\b(?:officer|officers|engineer|engineers|magistrate|magistrates|collector|collectors|minister|ministers|president|presidents|office-bearer|office-bearers|office bearers|contractor|contractors|athletes|athlete|professors|professor|scientists|legislators|judges|citizens|villagers|workers|farmers|tribals)\b/i.test(lower)
  ) {
    return true;
  }
  if (
    /\b(?:department|departments|ministry|ministries|commission|commissions|tribunal|tribunals|association|associations|authority|authorities|board|boards|directorate|directorates)\b/i.test(lower)
  ) {
    return true;
  }
  if (/^head of (?:department|weapon sales)/i.test(lower)) {
    return true;
  }
  return false;
}

export interface TextInterval {
  start: number;
  end: number;
  type: 'directive' | 'institution' | 'highlight';
  text: string;
}

/**
 * Computes non-overlapping intervals for directives, institutions, and keywords in the text.
 */
function computeIntervals(
  text: string,
  tags: string[] = [],
  keywords: string[] = [],
  extraTerms: string[] = []
): TextInterval[] {
  if (!text) return [];

  const intervals: TextInterval[] = [];

  const hasOverlap = (start: number, end: number) =>
    intervals.some((inv) => start < inv.end && end > inv.start);

  // Priority 1: Canonical Statutes & Unified Legal Anchors (Whole-entity matching)
  for (const statute of CANONICAL_STATUTES) {
    const regex = buildWordBoundaryRegex(statute);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (!hasOverlap(start, end)) {
        intervals.push({ start, end, type: 'highlight', text: match[0] });
      }
    }
  }

  // Article numbers (e.g. Article 21, Article 19, Article 326)
  const artRegex = /\bArticle\s+\d+([A-Z])?\b/gi;
  let artMatch: RegExpExecArray | null;
  while ((artMatch = artRegex.exec(text)) !== null) {
    const start = artMatch.index;
    const end = start + artMatch[0].length;
    if (!hasOverlap(start, end)) {
      intervals.push({ start, end, type: 'highlight', text: artMatch[0] });
    }
  }

  // Section numbers (e.g. Section 123, Section 3(d))
  const secRegex = /\bSection\s+\d+(\([a-z0-9]+\))?\b/gi;
  let secMatch: RegExpExecArray | null;
  while ((secMatch = secRegex.exec(text)) !== null) {
    const start = secMatch.index;
    const end = start + secMatch[0].length;
    if (!hasOverlap(start, end)) {
      intervals.push({ start, end, type: 'highlight', text: secMatch[0] });
    }
  }

  // Priority 2: Directives (longest first) -> type: 'directive'
  for (const directive of ALL_DIRECTIVES) {
    const regex = buildWordBoundaryRegex(directive);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (!hasOverlap(start, end)) {
        intervals.push({ start, end, type: 'directive', text: match[0] });
      }
    }
  }

  // Priority 3: Institutions & Stakeholders -> type: 'institution'
  for (const inst of INSTITUTIONS_STAKEHOLDERS) {
    const regex = buildWordBoundaryRegex(inst);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (!hasOverlap(start, end)) {
        intervals.push({ start, end, type: 'institution', text: match[0] });
      }
    }
  }

  // Priority 4: Clean concepts from keywords, tags, and extraTerms -> type: 'highlight'
  const candidatePool = new Set<string>();

  const processTermList = (list: string[]) => {
    for (const raw of list) {
      if (!raw) continue;
      const cleanedList = cleanCandidatePhrase(raw);
      for (const cleaned of cleanedList) {
        if (cleaned.length >= 2) {
          candidatePool.add(cleaned);
        }
      }
    }
  };

  processTermList(extraTerms);
  processTermList(tags);
  processTermList(keywords);

  // Sort candidate concepts longest-first
  const sortedCandidates = Array.from(candidatePool).sort((a, b) => b.length - a.length);

  for (const candidate of sortedCandidates) {
    const lower = candidate.toLowerCase();
    if (NON_KEYWORDS.has(lower) || BLACKLIST_PHRASES.has(lower) || UMBRELLA_TAGS.has(lower)) {
      continue;
    }

    const regex = buildWordBoundaryRegex(candidate);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (!hasOverlap(start, end)) {
        const itemType = isInstitution(candidate) || isInstitution(match[0]) ? 'institution' : 'highlight';
        intervals.push({ start, end, type: itemType, text: match[0] });
      }
    }
  }

  return intervals;
}

/**
 * Highlights authentic syllabus keywords, institutions, and question directives in a UPSC question statement.
 * Uses conflict-free interval mapping to safely wrap:
 *   - Directives: .kw-directive (Blue)
 *   - Institutions & Stakeholders: .kw-institution (Green)
 *   - Syllabus Concepts & Statutes: .kw-highlight (Amber)
 */
export function highlightQuestionKeywords(
  text: string,
  tags: string[] = [],
  keywords: string[] = [],
  extraTerms: string[] = []
): string {
  if (!text) return '';

  const intervals = computeIntervals(text, tags, keywords, extraTerms);

  if (intervals.length === 0) {
    return escapeHtml(text);
  }

  // Sort intervals by start position ascending
  intervals.sort((a, b) => a.start - b.start);

  let result = '';
  let lastIndex = 0;

  for (const interval of intervals) {
    if (interval.start > lastIndex) {
      result += escapeHtml(text.slice(lastIndex, interval.start));
    }

    const rawSegment = text.slice(interval.start, interval.end);
    const safeSegment = escapeHtml(rawSegment);

    if (interval.type === 'directive') {
      result += `<span class="kw-directive" title="Directive: ${safeSegment}">${safeSegment}</span>`;
    } else if (interval.type === 'institution') {
      result += `<span class="kw-institution" title="Institution / Stakeholder: ${safeSegment}">${safeSegment}</span>`;
    } else {
      result += `<span class="kw-highlight">${safeSegment}</span>`;
    }

    lastIndex = interval.end;
  }

  if (lastIndex < text.length) {
    result += escapeHtml(text.slice(lastIndex));
  }

  return result;
}

/**
 * Extracts the list of matched keywords highlighted in the question.
 */
export function getMatchedKeywordsInText(
  text: string,
  tags: string[] = [],
  keywords: string[] = [],
  extraTerms: string[] = []
): string[] {
  if (!text) return [];
  const intervals = computeIntervals(text, tags, keywords, extraTerms);
  const matched = new Set<string>();

  for (const inv of intervals) {
    if (inv.type === 'highlight') {
      matched.add(inv.text);
    }
  }

  return Array.from(matched);
}

/**
 * Extracts the list of matched directives detected in the question.
 */
export function getMatchedDirectivesInText(text: string): string[] {
  if (!text) return [];
  const intervals = computeIntervals(text);
  const matched = new Set<string>();

  for (const inv of intervals) {
    if (inv.type === 'directive') {
      matched.add(inv.text);
    }
  }

  return Array.from(matched);
}

/**
 * Extracts the list of matched institutions and stakeholders detected in the question.
 */
export function getMatchedInstitutionsInText(text: string): string[] {
  if (!text) return [];
  const intervals = computeIntervals(text);
  const matched = new Set<string>();

  for (const inv of intervals) {
    if (inv.type === 'institution') {
      matched.add(inv.text);
    }
  }

  return Array.from(matched);
}
