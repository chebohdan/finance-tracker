// components/QueryErrorFallback.tsx
interface QueryErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
  title?: string;
  description?: string;
  isFatal?: boolean; // Should this block the entire page?
}

export function QueryErrorFallback({
  error,
  onRetry,
  title = "Error Loading Data",
  description = "Something went wrong. Please try again.",
  isFatal = false,
}: Readonly<QueryErrorFallbackProps>) {
  if (!error) return null;

  const containerClass = isFatal
    ? " text-red-800min-h-screen flex items-center justify-center bg-[var(--color-dark-bg)]"
    : "bg-red-50 border border-red-200 rounded p-4 mb-4";

  const textClass = isFatal ? "text-center text-red-600" : "text-red-800";

  return (
    <div className={containerClass}>
      <div className={textClass}>
        <p className="font-bold text-lg">{title}</p>
        <p className="text-sm mt-1">{description}</p>

        <p className="text-xs mt-2 font-mono text-red-600">{error.message}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
