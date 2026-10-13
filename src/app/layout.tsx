import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import AuthModal from '@/components/auth/AuthModal';
import AuthSyncManager from '@/components/auth/AuthSyncManager';

export const metadata: Metadata = {
  metadataBase: new URL('https://theupscbreakdown.com'),
  title: "The UPSC Breakdown — Don't Outsource Your Intellect to AI. Structure It.",
  description: "Don't outsource your intellect to AI. Structure it. Search 1,100+ verified UPSC Mains questions (2013–2026), explore high-yield topic heatmaps, official syllabus micro-trees, and build personal answer frameworks.",
  keywords: ['UPSC', 'CSE', 'Mains', 'PYQ', 'The UPSC Breakdown', 'Previous Year Questions', 'GS1', 'GS2', 'GS3', 'GS4', 'Essay', 'UPSC Search', 'High Yield Topics'],
  icons: {
    icon: '/prism_logo_mark.png',
    apple: '/prism_logo_mark.png',
  },
  openGraph: {
    title: "The UPSC Breakdown — Don't Outsource Your Intellect to AI. Structure It.",
    description: "Search 1,100+ verified UPSC Mains questions (2013–2026), explore high-yield topic heatmaps, and build personal answer frameworks.",
    url: 'https://theupscbreakdown.com',
    siteName: 'The UPSC Breakdown',
    images: [
      {
        url: '/prism_logo_full.png',
        width: 1200,
        height: 630,
        alt: 'The UPSC Breakdown Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/prism_logo_mark.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-bodytext antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileNav />
        <AuthModal />
        <AuthSyncManager />
      </body>
    </html>
  );
}
