'use client';

import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Custom500() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">500</CardTitle>
            <CardDescription className="text-lg mt-2">
              Internal Server Error
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We're sorry, but something went wrong on our end. Our team has been notified and is working to fix the issue.
          </p>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page or return to the home page.
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            asChild
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="absolute bottom-4 text-center w-full px-4">
        <p className="text-xs text-muted-foreground">
          Error code: 500 • If the problem persists, please contact support
        </p>
      </div>
    </div>
  );
}