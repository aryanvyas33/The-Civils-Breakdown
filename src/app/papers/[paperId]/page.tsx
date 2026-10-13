import { redirect } from 'next/navigation';

export default function PaperIdPage({
  params,
  searchParams,
}: {
  params: { paperId: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const query = searchParams
    ? new URLSearchParams(
        Object.entries(searchParams).flatMap(([k, v]) =>
          Array.isArray(v) ? v.map((val) => [k, val]) : v !== undefined ? [[k, v]] : []
        )
      ).toString()
    : '';

  redirect(`/explore/${params.paperId}${query ? `?${query}` : ''}`);
}
