'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const trackingId = searchParams.get('trackingId');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!trackingId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Tracking ID Found</h1>
          <Link href="/request">
            <Button>Start New Request</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for submitting your website request
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Tracking ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Tracking ID:</div>
                  <div className="text-2xl font-mono font-bold text-gray-900">
                    {trackingId}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong className="text-gray-900">What happens next?</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Our team will review your request</li>
                <li>We'll begin working on your website specifications</li>
                <li>You can track your request status using the tracking ID above</li>
                <li>We'll notify you when your request is complete</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Important:</strong> Save your tracking ID! You'll need it to check the
                status of your request.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href={`/track/${trackingId}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Track Request Status
                </Button>
              </Link>
              <Link href="/request" className="flex-1">
                <Button className="w-full">Submit Another Request</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="ghost">← Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
