'use client';

import { Button } from '@/components';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const AdminError = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
};

export default AdminError;
