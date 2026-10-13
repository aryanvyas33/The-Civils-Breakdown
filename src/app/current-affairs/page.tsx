import type { Metadata } from 'next';
import { getAllTopics } from '@/lib/ca-topics';
import CAPriorityTracker from '@/components/current-affairs/CAPriorityTracker';

export const metadata: Metadata = {
  title: 'Current Affairs Priority Tracker — Mains 2027 | The Civils Breakdown',
  description:
    '76 UPSC Mains 2027 current affairs themes evaluated by an 8-parameter priority model. Focus on Band A must-cover issues, multi-paper angles, and track prep completion.',
  keywords: [
    'UPSC Current Affairs',
    'Mains 2027 Current Affairs',
    'UPSC CA Priority Tracker',
    'GS1',
    'GS2',
    'GS3',
    'GS4',
    'The Civils Breakdown',
    'Civils Breakdown',
  ],
  openGraph: {
    title: 'Current Affairs Priority Tracker — The Civils Breakdown',
    description:
      '76 high-probability UPSC Mains current affairs themes ranked by 8 objective parameters with multi-paper syllabus linking.',
    type: 'website',
  },
};

export default function CurrentAffairsPage() {
  const topics = getAllTopics();

  return (
    <main className="w-full bg-[#F8F5EE]">
      <CAPriorityTracker topics={topics} />
    </main>
  );
}
