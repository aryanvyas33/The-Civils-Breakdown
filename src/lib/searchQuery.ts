/**
 * UPSC Search Query Preprocessor & Domain Vocabulary
 * Handles:
 *  1. Query normalization and stopword elimination
 *  2. Domain-specific UPSC acronym & synonym expansion
 *  3. Morphological inflection (plurals, singulars, and core syllabus root forms)
 *  4. Exact phrase regex generation with strict word boundaries (\b...\b)
 */

export const UPSC_ACRONYM_MAP: Record<string, string[]> = {
  ai: ['ai', 'artificial intelligence', 'agentic ai', 'chatgpt', 'genai', 'generative ai', 'machine learning'],
  it: ['it', 'information technology'],
  rti: ['rti', 'right to information'],
  rpa: ['rpa', 'representation of the people act', 'representation of people act'],
  ngt: ['ngt', 'national green tribunal'],
  cag: ['cag', 'comptroller and auditor general', 'comptroller & auditor general'],
  cbi: ['cbi', 'central bureau of investigation'],
  cvc: ['cvc', 'central vigilance commission'],
  rbi: ['rbi', 'reserve bank of india'],
  wto: ['wto', 'world trade organization'],
  who: ['who', 'world health organization'],
  un: ['un', 'united nations'],
  eu: ['eu', 'european union'],
  cbdc: ['cbdc', 'central bank digital currency', 'digital rupee'],
  gst: ['gst', 'goods and services tax'],
  sdg: ['sdg', 'sustainable development goals', 'sdgs'],
  ppp: ['ppp', 'public private partnership', 'public-private partnership'],
  msme: ['msme', 'micro small and medium enterprises', 'msmes'],
  shg: ['shg', 'self help group', 'self-help group', 'self help groups', 'shgs'],
  fdi: ['fdi', 'foreign direct investment'],
  upi: ['upi', 'unified payments interface'],
  pesa: ['pesa', 'panchayats extension to scheduled areas'],
  poshan: ['poshan', 'poshan abhiyaan', 'national nutrition mission'],
  trips: ['trips', 'trade-related aspects of intellectual property rights'],
  brics: ['brics'],
  asean: ['asean'],
  bimstec: ['bimstec'],
  quad: ['quad'],
  isro: ['isro', 'indian space research organisation'],
  drdo: ['drdo', 'defence research and development organisation'],
  nhrc: ['nhrc', 'national human rights commission'],
  ncsc: ['ncsc', 'national commission for scheduled castes'],
  ncst: ['ncst', 'national commission for scheduled tribes'],
  cci: ['cci', 'competition commission of india'],
  niti: ['niti', 'niti aayog'],
  fra: ['fra', 'forest rights act'],
  crpc: ['crpc', 'code of criminal procedure'],
  ipc: ['ipc', 'indian penal code'],
  bns: ['bns', 'bharatiya nyaya sanhita'],
  bnss: ['bnss', 'bharatiya nagarik suraksha sanhita'],
  ucc: ['ucc', 'uniform civil code'],
  eia: ['eia', 'environmental impact assessment'],
  mgnrega: ['mgnrega', 'mahatma gandhi national rural employment guarantee act', 'nrega'],
};

export const QUERY_STOPWORDS = new Set([
  'in', 'of', 'the', 'and', 'for', 'with', 'on', 'at', 'to', 'from', 'by',
  'an', 'a', 'as', 'into', 'between', 'under', 'over', 'about', 'how', 'what',
  'why', 'is', 'are', 'was', 'were', 'does', 'do', 'did', 'their', 'its'
]);

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function buildWordBoundaryRegex(term: string): RegExp {
  const clean = term.trim();
  const escaped = escapeRegex(clean);
  const lead = /^\w/.test(clean) ? '\\b' : '(?<=^|[^a-zA-Z0-9])';
  const trail = /\w$/.test(clean) ? '\\b' : '(?=$|[^a-zA-Z0-9])';
  return new RegExp(`${lead}${escaped}${trail}`, 'i');
}

/**
 * Generates natural inflections (singular/plural and core syllabus root variations)
 */
export function getInflections(term: string): string[] {
  const set = new Set<string>([term]);
  const len = term.length;

  if (term.endsWith('ies') && len > 4) {
    set.add(term.slice(0, -3) + 'y');
  } else if (term.endsWith('es') && len > 4) {
    set.add(term.slice(0, -2));
    set.add(term.slice(0, -1));
  } else if (term.endsWith('s') && !term.endsWith('ss') && len > 3) {
    set.add(term.slice(0, -1));
  } else if (len > 2 && !term.endsWith('s')) {
    set.add(term + 's');
  }

  // Common UPSC root variations
  if (term === 'ethics' || term === 'ethical' || term === 'ethic') {
    set.add('ethics');
    set.add('ethical');
    set.add('ethic');
  } else if (term === 'polity' || term === 'political' || term === 'politics') {
    set.add('polity');
    set.add('political');
    set.add('politics');
  } else if (term === 'economy' || term === 'economic' || term === 'economics') {
    set.add('economy');
    set.add('economic');
    set.add('economics');
  } else if (term === 'govern' || term === 'governance' || term === 'governor' || term === 'governors') {
    set.add('governor');
    set.add('governors');
    set.add('governance');
  }

  return Array.from(set);
}

export interface TokenMatcher {
  token: string;
  expansions: string[];
  regexes: RegExp[];
}

export interface PreprocessedQuery {
  rawQuery: string;
  cleanQuery: string;
  rawTokens: string[];
  substantiveTokens: string[];
  tokensToUse: string[];
  phraseRegex: RegExp;
  matchers: TokenMatcher[];
  highlightTerms: string[];
}

export function preprocessSearchQuery(query: string): PreprocessedQuery {
  const rawQuery = query || '';
  const cleanQuery = rawQuery.trim().toLowerCase();
  const rawTokens = cleanQuery.split(/\s+/).filter(Boolean);
  const substantive = rawTokens.filter((t) => !QUERY_STOPWORDS.has(t));
  const tokensToUse = substantive.length > 0 ? substantive : rawTokens;

  const phraseRegex = buildWordBoundaryRegex(cleanQuery);
  const highlightSet = new Set<string>();

  const matchers: TokenMatcher[] = tokensToUse.map((tok) => {
    const acronymExpansions = UPSC_ACRONYM_MAP[tok] || [];
    const inflected = getInflections(tok);
    const combinedExpansions = Array.from(new Set([tok, ...acronymExpansions, ...inflected]));

    combinedExpansions.forEach((exp) => highlightSet.add(exp));

    const regexes = combinedExpansions.map((term) => buildWordBoundaryRegex(term));

    return {
      token: tok,
      expansions: combinedExpansions,
      regexes,
    };
  });

  return {
    rawQuery,
    cleanQuery,
    rawTokens,
    substantiveTokens: substantive,
    tokensToUse,
    phraseRegex,
    matchers,
    highlightTerms: Array.from(highlightSet),
  };
}
