import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: 'noindex',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0e14] text-white">
      <div className="text-center">
        <p className="text-[#ff1801] text-6xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-bold uppercase tracking-wide">
          Page Not Found
        </h1>
        <p className="mt-2 text-gray-400 text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded bg-[#ff1801] px-6 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-[#e01500]"
        >
          Back to Sign In
        </Link>
      </div>
    </main>
  );
}
