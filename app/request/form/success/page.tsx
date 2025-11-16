'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get tracking ID from localStorage or URL params
      const id = localStorage.getItem('lastTrackingId');
      const name = localStorage.getItem('lastProjectName') || '';

      if (!id) {
        // No tracking ID found, redirect to home
        router.push('/');
        return;
      }

      setTrackingId(id);
      setProjectName(name);

      // Clear the temporary storage
      localStorage.removeItem('lastTrackingId');
      localStorage.removeItem('lastProjectName');
      localStorage.removeItem('formData');
      localStorage.removeItem('selectedTemplate');
    }
  }, [router]);

  if (!trackingId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleCopyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    alert('Tracking ID copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Request Submitted Successfully!
          </h1>
          <p className="text-xl text-gray-600">
            {projectName
              ? `We've received your request for "${projectName}"`
              : "We've received your website request"}
          </p>
        </div>

        {/* Tracking ID Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Tracking ID</p>
            <div className="flex items-center justify-center gap-4">
              <code className="text-3xl font-mono font-bold text-blue-600 bg-blue-50 px-6 py-3 rounded">
                {trackingId}
              </code>
              <button
                onClick={handleCopyTrackingId}
                className="p-2 hover:bg-gray-100 rounded"
                title="Copy to clipboard"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 mt-0.5">
                  1
                </span>
                <span>
                  We'll review your request and all the details you provided
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 mt-0.5">
                  2
                </span>
                <span>
                  Our team will start working on your website based on your specifications
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 mt-0.5">
                  3
                </span>
                <span>
                  You can track the status of your request using the tracking ID above
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Save your tracking ID! You'll need it to check
              the status of your request.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full sm:w-auto"
          >
            ← Back to Home
          </Button>
          <Button
            onClick={() => router.push('/request')}
            className="w-full sm:w-auto"
          >
            Submit Another Request
          </Button>
        </div>

        {/* Email Notification (Future Feature) */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Email notifications are coming soon. For now, please save your tracking ID.
          </p>
        </div>
      </div>
    </div>
  );
}
