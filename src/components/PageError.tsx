interface PageErrorProps {
  message: string;
  onRetry?: () => void;
}

export function PageError({ message, onRetry }: PageErrorProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-bold text-retro-red">{message}</h1>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-retro-green px-4 py-2 font-medium text-retro-black transition-colors hover:bg-retro-green-bright"
        >
          Try Again
        </button>
      )}
    </div>
  );
} 