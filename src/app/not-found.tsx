import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white border-4 border-retro-border p-8 shadow-retro text-center">
        <div className="inline-block bg-retro-accent text-white font-vt text-sm px-3 py-1 mb-4 uppercase tracking-wider font-bold">
          ERROR CODE: 404
        </div>

        <h1 className="font-vt text-4xl sm:text-5xl text-retro-border font-bold uppercase mb-3">
          QUESTION NOT FOUND IN ARCHIVE
        </h1>

        <p className="font-space text-sm text-retro-border/80 mb-8 leading-relaxed">
          The requested page or question dossier could not be located in the UPSC Civil Services Examination index. It may have been moved, re-indexed, or never set by the Commission.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/search"
            className="retro-btn bg-retro-folder text-retro-border font-vt text-lg uppercase flex items-center justify-center gap-2 py-2.5 px-5"
          >
            <Search className="w-4 h-4" />
            <span>SEARCH ARCHIVE</span>
          </Link>
          <Link
            href="/"
            className="retro-btn bg-white text-retro-border font-vt text-lg uppercase flex items-center justify-center gap-2 py-2.5 px-5 hover:bg-gray-50"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
