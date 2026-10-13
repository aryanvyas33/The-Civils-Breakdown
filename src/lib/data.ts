import { Paper, Subject, Question, RelatedQuestion, FilterOptions } from '@/types';
import papersData from '@/data/papers.json';
import subjectsData from '@/data/subjects.json';

// Dynamic helper to safely require questions and tags if built
let cachedQuestions: Question[] | null = null;
let cachedTags: { tag: string; count: number }[] | null = null;

function loadQuestionsData(): Question[] {
  if (cachedQuestions) return cachedQuestions;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cachedQuestions = require('@/data/questions.json');
    return cachedQuestions || [];
  } catch (err) {
    console.error('[DataService] Failed to load questions.json:', err);
    return [];
  }
}

function loadTagsData(): { tag: string; count: number }[] {
  if (cachedTags) return cachedTags;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cachedTags = require('@/data/tags.json');
    return cachedTags || [];
  } catch (err) {
    console.error('[DataService] Failed to load tags.json:', err);
    return [];
  }
}

export function getAllPapers(): Paper[] {
  return papersData as Paper[];
}

export function getPaperById(paperId: string): Paper | undefined {
  return (papersData as Paper[]).find((p) => p.id.toLowerCase() === paperId.toLowerCase());
}

export function getAllSubjects(): Subject[] {
  return subjectsData as Subject[];
}

export function getSubjectsByPaper(paperId: string): Subject[] {
  return (subjectsData as Subject[]).filter((s) => s.paperId.toLowerCase() === paperId.toLowerCase());
}

export function getSubjectById(subjectId: string): Subject | undefined {
  return (subjectsData as Subject[]).find((s) => s.id.toLowerCase() === subjectId.toLowerCase());
}

export function getAllQuestions(): Question[] {
  return loadQuestionsData();
}

export function getQuestionById(id: string): Question | undefined {
  const questions = getAllQuestions();
  return questions.find((q) => q.id.toLowerCase() === id.toLowerCase());
}

export function getQuestionsByPaper(paperId: string): Question[] {
  const questions = getAllQuestions();
  return questions.filter((q) => q.paperId.toLowerCase() === paperId.toLowerCase());
}

export function getQuestionsBySubject(subjectId: string): Question[] {
  const questions = getAllQuestions();
  return questions.filter((q) => q.subjectId.toLowerCase() === subjectId.toLowerCase());
}

export function getQuestionsByYear(year: number): Question[] {
  const questions = getAllQuestions();
  return questions.filter((q) => q.year === year);
}

export function getFilteredQuestions(options: FilterOptions): Question[] {
  let questions = [...getAllQuestions()];

  if (options.paper && options.paper !== 'all') {
    questions = questions.filter((q) => q.paperId.toLowerCase() === options.paper?.toLowerCase());
  }

  if (options.subject) {
    questions = questions.filter((q) => q.subjectId.toLowerCase() === options.subject?.toLowerCase());
  }

  if (options.year) {
    questions = questions.filter((q) => q.year === options.year);
  }

  if (options.tag) {
    const searchTag = options.tag.toLowerCase();
    questions = questions.filter((q) =>
      q.tags.some((t) => t.toLowerCase() === searchTag)
    );
  }

  if (options.sortBy === 'year-desc') {
    questions.sort((a, b) => b.year - a.year || a.questionNumber - b.questionNumber);
  } else if (options.sortBy === 'year-asc') {
    questions.sort((a, b) => a.year - b.year || a.questionNumber - b.questionNumber);
  } else if (options.sortBy === 'marks-desc') {
    questions.sort((a, b) => b.marks - a.marks);
  }

  return questions;
}

export function getAllTags(): { tag: string; count: number }[] {
  return loadTagsData();
}

export function getStats() {
  const questions = getAllQuestions();
  const papers = getAllPapers();
  const subjects = getAllSubjects();

  const totalQuestions = questions.length;
  const paperCounts: Record<string, number> = {};
  const yearCounts: Record<number, number> = {};

  questions.forEach((q) => {
    paperCounts[q.paperId] = (paperCounts[q.paperId] || 0) + 1;
    yearCounts[q.year] = (yearCounts[q.year] || 0) + 1;
  });

  return {
    totalQuestions: totalQuestions > 0 ? totalQuestions : 1131,
    totalPapers: papers.length,
    totalSubjects: subjects.length,
    yearSpan: '2013–2026',
    paperCounts,
    yearCounts,
  };
}
