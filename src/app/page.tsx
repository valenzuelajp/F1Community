export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          F1Store
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Official Formula 1 Merchandise Store — Coming Soon
        </p>
        <div className="space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
          >
            View Repository
          </a>
          <a
            href="/docs"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </main>
  );
}