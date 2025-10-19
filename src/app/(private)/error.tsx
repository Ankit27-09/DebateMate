'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, LayoutDashboard, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PrivateError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Private section error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Dashboard Error</CardTitle>
          <CardDescription className="text-muted-foreground">
            Something went wrong in your dashboard. We&apos;re sorry for the inconvenience.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/10 p-3">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                Development Error Details:
              </h4>
              <pre className="text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap break-words">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>You can try:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Refreshing this page</li>
              <li>Going back to the dashboard</li>
              <li>Checking your internet connection</li>
              <li>Logging out and back in if the issue persists</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={reset}
            className="w-full"
            variant="default"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          
          <div className="flex gap-2 w-full">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}