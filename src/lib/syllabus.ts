import { SyllabusPointer } from '@/types';
import syllabusPointersData from '@/data/syllabus-pointers.json';

// Cast the imported JSON to the SyllabusPointer type
const allPointers: SyllabusPointer[] = syllabusPointersData as SyllabusPointer[];

export function getAllSyllabusPointers(): SyllabusPointer[] {
  return allPointers;
}

export function getSyllabusPointersByPaper(paperId: string): SyllabusPointer[] {
  return allPointers.filter(p => p.paperId.toLowerCase() === paperId.toLowerCase());
}

export function getSyllabusPointersBySubject(subjectId: string): SyllabusPointer[] {
  return allPointers.filter(p => p.subjectId.toLowerCase() === subjectId.toLowerCase());
}

export function getSyllabusPointerById(pointerId: string): SyllabusPointer | undefined {
  return allPointers.find(p => p.id.toLowerCase() === pointerId.toLowerCase());
}
