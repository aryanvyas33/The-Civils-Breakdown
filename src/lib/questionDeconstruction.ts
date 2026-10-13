export interface DeconstructionData {
  directives: { phrase: string; task: string }[];
  primaryEntities: { role: string; label: string; tagClass: string }[];
  scopeLimiters: { phrase: string; constraint: string }[];
  whatIsAsked: string[];
  whatToWrite: {
    heading: string;
    wordCount: string;
    points: string[];
  }[];
}

// Curated deconstructions for benchmark questions
const CURATED_DECONSTRUCTIONS: Record<string, DeconstructionData> = {
  'gs2-2026-q12': {
    directives: [
      { phrase: 'What is meant by', task: 'Definitional task (Define judicial legislation with constitutional grounding)' },
      { phrase: 'Discuss', task: 'Explanatory task requiring multi-dimensional constitutional and administrative coverage' },
      { phrase: 'What is asked and what should be written', task: 'Structural breakdown task from an authentic UPSC CSE evaluative point of view' },
    ],
    primaryEntities: [
      { role: 'Core Theoretical Concept', label: 'Judicial Legislation', tagClass: 'bg-purple-50 text-purple-800 border-purple-200' },
      { role: 'Institutional Actor', label: 'Apex Court (Supreme Court of India)', tagClass: 'bg-blue-50 text-blue-800 border-blue-200' },
      { role: 'Primary Applied Concept', label: 'Passive Euthanasia', tagClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
      { role: 'Secondary Applied Concept', label: 'Living Will (Advance Medical Directives)', tagClass: 'bg-amber-50 text-amber-800 border-amber-200' },
    ],
    scopeLimiters: [
      {
        phrase: 'In this context',
        constraint: 'Forces the answer to link the theoretical concept (judge-made law under Art 142) directly to the applied concepts (Common Cause & Aruna Shanbaug guidelines). You cannot write a standalone essay on euthanasia without evaluating it as judicial legislation.',
      },
      {
        phrase: 'From UPSC point of view',
        constraint: 'Dictates a balanced constitutional and administrative tone—weighing fundamental rights (Art 21) against separation of powers and the doctrine of necessity, rather than a purely philosophical or bioethical debate.',
      },
    ],
    whatIsAsked: [
      '1. Clear constitutional definition and scope of "Judicial Legislation" (differentiating it from ordinary judicial review).',
      '2. Evolution and substance of Apex Court verdicts sanctioning passive euthanasia and advance directives (Gian Kaur -> Aruna Shanbaug -> Common Cause).',
      '3. Critical synthesis explaining WHY framing procedural safeguards for a Living Will constitutes judicial legislation to fill a legislative vacuum.',
      '4. Balanced evaluation: Protection of human dignity (Article 21) vs. institutional competence and Separation of Powers.',
    ],
    whatToWrite: [
      {
        heading: 'Introduction: Conceptual Definition & Constitutional Basis',
        wordCount: '~35-40 words (15%)',
        points: [
          'Define Judicial Legislation: The practice of the higher judiciary formulating detailed guidelines, rules, or operative norms to fill a vacuum left by legislative inaction, having the force of law under Article 141.',
          'Constitutional Anchor: Derived from Article 142 (power to pass decrees for "complete justice") and Article 32 (constitutional remedies), as previously seen in Vishaka (1997) and D.K. Basu (1997).',
        ],
      },
      {
        heading: 'Body Part 1: Judicial Evolution of Euthanasia & Living Will',
        wordCount: '~70-80 words (30%)',
        points: [
          'Gian Kaur v. State of Punjab (1996): Held that "Right to Life" (Art 21) does not include "Right to Die", but hinted that dying with dignity at life\'s end is part of personal liberty.',
          'Aruna Shanbaug (2011): The Supreme Court allowed passive euthanasia (withholding life-support for patients in persistent vegetative state) under High Court writ supervision as a temporary mechanism.',
          'Common Cause v. UOI (2018): Constitution Bench held that the "Right to Die with Dignity" is an inviolable fundamental right under Article 21; formally legalized Passive Euthanasia and recognized Advance Medical Directives ("Living Will").',
          '2023 Simplification: Supreme Court amended guidelines to remove overly bureaucratic hurdles (such as judicial magistrate certification), enabling practical hospital-level execution.',
        ],
      },
      {
        heading: 'Body Part 2: The "In This Context" Bridge — Why This is Judicial Legislation',
        wordCount: '~70-75 words (30%)',
        points: [
          'Law-Making by Decree: In the complete absence of a parliamentary statute, the Court drafted comprehensive procedural codes: composition of Primary and Secondary Medical Boards, consent protocols, and revocation rules.',
          'Filling the Legislative Vacuum: Despite the 241st Law Commission Report recommending a statutory framework, Parliament had not enacted the Medical Treatment of Terminally Ill Patients Bill.',
          'Judicial Law as Binding Precedent: The operative guidelines operate as the law of the land under Article 141 until Parliament legislates on the subject.',
        ],
      },
      {
        heading: 'Body Part 3: Critical Appraisal from UPSC Point of View',
        wordCount: '~45-50 words (15%)',
        points: [
          'Justification (Substantive Justice): Upholds constitutional morality, patient autonomy, and prevents prolonged vegetative suffering and commercial exploitation.',
          'Constitutional Concern (Separation of Powers): Unelected judges lack the democratic legitimacy and institutional capacity to balance complex bioethical, socio-religious, and medical nuances through courtroom proceedings.',
        ],
      },
      {
        heading: 'Conclusion: The Doctrine of Necessity & The Way Forward',
        wordCount: '~25-30 words (10%)',
        points: [
          'Judicial legislation must strictly remain an interim stopgap (Doctrine of Necessity), never a permanent substitute for democratic law-making.',
          'Parliament must discharge its constitutional mandate by enacting a codified, transparent national statute on end-of-life care and advance directives.',
        ],
      },
    ],
  },
};

export function getCuratedDeconstruction(questionId: string): DeconstructionData | null {
  return CURATED_DECONSTRUCTIONS[questionId] || null;
}

export function adaptRawDeconstruction(raw: any, question?: { text: string; marks: number; tags: string[]; subjectName: string }): DeconstructionData {
  if (!raw && !question) {
    return {
      directives: [{ phrase: 'Direct Demand', task: 'Direct response required.' }],
      primaryEntities: [],
      scopeLimiters: [],
      whatIsAsked: [],
      whatToWrite: [],
    };
  }

  // 1. Directives
  const directives: { phrase: string; task: string }[] = [];
  if (raw?.directives && raw.directives.length > 0) {
    raw.directives.forEach((d: any) => {
      directives.push({
        phrase: d.phrase ? d.phrase.toUpperCase() : 'DIRECTIVE',
        task: d.task || 'Analyze the statement from multiple dimensions.',
      });
    });
  } else {
    directives.push({
      phrase: 'EXAMINE',
      task: 'Provide a structured, multi-dimensional analytical evaluation.',
    });
  }

  // 2. Primary Entities
  const primaryEntities: { role: string; label: string; tagClass: string }[] = [];
  if (raw?.key_terms && raw.key_terms.length > 0) {
    raw.key_terms.slice(0, 4).forEach((k: any) => {
      let role = 'Core Theoretical Concept';
      let tagClass = 'bg-purple-50 text-purple-800 border-purple-200';
      if (k.type === 'ACTOR') {
        role = 'Institutional Actor';
        tagClass = 'bg-blue-50 text-blue-800 border-blue-200';
      } else if (k.type === 'LEGAL_ANCHOR') {
        role = 'Constitutional / Legal Anchor';
        tagClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      } else if (k.type === 'INSTRUMENT') {
        role = 'Policy / Statutory Instrument';
        tagClass = 'bg-amber-50 text-amber-800 border-amber-200';
      } else if (k.type === 'DIMENSION') {
        role = 'Socio-Economic Dimension';
        tagClass = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      }
      primaryEntities.push({ role, label: k.term, tagClass });
    });
  } else if (question) {
    question.tags.slice(0, 3).forEach((tag, idx) => {
      primaryEntities.push({
        role: idx === 0 ? 'Primary Concept' : 'Syllabus Linkage',
        label: tag,
        tagClass: idx === 0 ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-blue-50 text-blue-800 border-blue-200',
      });
    });
  }

  // 3. Scope Limiters
  const scopeLimiters: { phrase: string; constraint: string }[] = [];
  if (raw?.scope_limiters && raw.scope_limiters.length > 0) {
    raw.scope_limiters.forEach((s: any) => {
      scopeLimiters.push({ phrase: s.phrase, constraint: s.constraint });
    });
  } else {
    scopeLimiters.push({
      phrase: 'Prescribed Examination Scope',
      constraint: `Strict adherence to ${question?.marks === 15 ? '250 words (15 Marks)' : '150 words (10 Marks)'} with balanced administrative, constitutional, and empirical grounding.`,
    });
  }

  // 4. What is asked
  const whatIsAsked: string[] = [];
  if (raw?.sub_questions && raw.sub_questions.length > 0) {
    raw.sub_questions.forEach((sq: any, i: number) => {
      whatIsAsked.push(`${i + 1}. ${sq.text}`);
    });
  } else if (question) {
    whatIsAsked.push(`1. Direct response to the core query: ${question.text}`);
  }

  // 5. What to write
  const whatToWrite: { heading: string; wordCount: string; points: string[] }[] = [];
  const marks = question?.marks || 15;
  const is15M = marks >= 15;

  if (raw?.answer_skeleton) {
    if (raw.answer_skeleton.introduction) {
      whatToWrite.push({
        heading: 'Introduction: Conceptual Context & Definition',
        wordCount: is15M ? '~35-40 words (15%)' : '~20-25 words (15%)',
        points: [raw.answer_skeleton.introduction],
      });
    }

    if (raw.answer_skeleton.body_sections && raw.answer_skeleton.body_sections.length > 0) {
      raw.answer_skeleton.body_sections.forEach((sec: any) => {
        whatToWrite.push({
          heading: sec.heading,
          wordCount: is15M ? '~70-80 words (30%)' : '~45-50 words (30%)',
          points: [sec.focus],
        });
      });
    }

    if (raw.answer_skeleton.critical_view) {
      whatToWrite.push({
        heading: 'Critical Appraisal: Challenges & Nuanced Counter-Perspective',
        wordCount: is15M ? '~45-50 words (20%)' : '~25-30 words (20%)',
        points: [raw.answer_skeleton.critical_view],
      });
    }

    if (raw.answer_skeleton.conclusion) {
      whatToWrite.push({
        heading: 'Conclusion: Forward-Looking Perspective & Way Forward',
        wordCount: is15M ? '~25-30 words (10%)' : '~15-20 words (10%)',
        points: [raw.answer_skeleton.conclusion],
      });
    }
  } else if (question) {
    whatToWrite.push({
      heading: 'Introduction: Conceptual Context & Background',
      wordCount: is15M ? '~35-40 words' : '~20-25 words',
      points: [`Define the core theme (${question.tags[0] || question.subjectName}) and state contemporary relevance.`],
    });
    whatToWrite.push({
      heading: 'Body: Core Analysis & Multi-Dimensional Arguments',
      wordCount: is15M ? '~150-160 words' : '~90-100 words',
      points: [
        `Address primary demands of the prompt with constitutional, empirical, or governance arguments.`,
        `Highlight institutional challenges, case studies, and committee recommendations.`,
      ],
    });
    whatToWrite.push({
      heading: 'Conclusion: Way Forward & Balanced Synthesis',
      wordCount: is15M ? '~25-30 words' : '~15-20 words',
      points: ['Provide actionable solutions adhering to constitutional morality and sustainable development.'],
    });
  }

  return { directives, primaryEntities, scopeLimiters, whatIsAsked, whatToWrite };
}

export function getQuestionDeconstruction(questionId: string): DeconstructionData | null {
  return CURATED_DECONSTRUCTIONS[questionId] || null;
}

import { DeconstructionApiResponse } from '@/types/deconstruction';

export async function fetchQuestionDeconstruction(
  questionId: string,
  fallbackQuestion?: { text: string; marks: number; tags: string[]; subjectName: string }
): Promise<DeconstructionData | null> {
  const curated = getCuratedDeconstruction(questionId);
  if (curated) return curated;

  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/deconstruction/${encodeURIComponent(questionId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.deconstruction) return data.deconstruction;
      }
    } catch (e) {
      console.warn('[DeconstructionClient] API fetch failed, falling back to synthesis:', e);
    }
  }

  return fallbackQuestion ? adaptRawDeconstruction(null, fallbackQuestion) : null;
}

export async function fetchFullDeconstruction(
  questionId: string,
  fallbackQuestion?: { text: string; marks: number; tags: string[]; subjectName: string }
): Promise<DeconstructionApiResponse | null> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/deconstruction/${encodeURIComponent(questionId)}`);
      if (res.ok) {
        return (await res.json()) as DeconstructionApiResponse;
      }
    } catch (e) {
      console.warn('[DeconstructionClient] API fetch failed, falling back to synthesis:', e);
    }
  }

  const legacy = await fetchQuestionDeconstruction(questionId, fallbackQuestion);
  return legacy ? { source: 'synthesized', deconstruction: legacy, data: null } : null;
}

