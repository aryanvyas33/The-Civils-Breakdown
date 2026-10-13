import { redirect } from 'next/navigation';

export default function SyllabusSubjectPage({ params }: { params: { paperId: string; subjectId: string } }) {
  redirect(`/explore/${params.paperId}?subject=${params.subjectId}`);
}
