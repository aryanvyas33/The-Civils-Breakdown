import { redirect } from 'next/navigation';

export default function SyllabusPointerPage({ params }: { params: { paperId: string; subjectId: string; pointerId: string } }) {
  redirect(`/explore/${params.paperId}?pointer=${params.pointerId}`);
}
