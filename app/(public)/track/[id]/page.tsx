'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface RequestData {
  id: string;
  trackingId: string;
  status: string;
  templateUsed?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  projectData: {
    projectName: string;
    websiteTitle: string;
    submitterEmail?: string;
  };
}

const STATUS_INFO = {
  PENDING: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Your request has been received and is waiting to be reviewed.',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-800',
    description: 'We are currently working on your website request.',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'bg-green-100 text-green-800',
    description: 'Your website request has been completed!',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    description: 'This request has been cancelled.',
  },
};

export default function TrackRequestPage() {
  const params = useParams();
  const router = useRouter();
  const trackingId = params.id as string;

  const [request, setRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`/api/requests/${trackingId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Request not found. Please check your tracking ID.');
          }
          throw new Error('Failed to fetch request status');
        }

        const data = await response.json();
        setRequest(data.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load request');
      } finally {
        setLoading(false);
      }
    };

    if (trackingId) {
      fetchRequest();
    }
  }, [trackingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading request status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{error}</p>
              <div className="flex gap-3">
                <Button onClick={() => router.back()} variant="outline" className="flex-1">
                  Go Back
                </Button>
                <Link href="/request" className="flex-1">
                  <Button className="w-full">New Request</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!request) {
    return null;
  }

  const statusInfo = STATUS_INFO[request.status as keyof typeof STATUS_INFO];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost">← Back to Home</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{request.projectData.projectName}</CardTitle>
                <p className="text-gray-600 mt-1">{request.projectData.websiteTitle}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tracking ID */}
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-1">Tracking ID</div>
              <div className="text-lg font-mono font-bold text-gray-900">{request.trackingId}</div>
            </div>

            {/* Status Description */}
            <div className="bg-gray-50 border rounded-lg p-4">
              <p className="text-sm text-gray-700">{statusInfo.description}</p>
            </div>

            {/* Timeline */}
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-3">Timeline</div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Request Submitted</div>
                    <div className="text-xs text-gray-600">{formatDate(request.createdAt)}</div>
                  </div>
                </div>

                {request.status !== 'PENDING' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">In Progress</div>
                      <div className="text-xs text-gray-600">{formatDate(request.updatedAt)}</div>
                    </div>
                  </div>
                )}

                {request.status === 'COMPLETED' && request.completedAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Completed</div>
                      <div className="text-xs text-gray-600">{formatDate(request.completedAt)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {request.templateUsed && (
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Template</div>
                <div className="text-sm text-gray-600 capitalize">{request.templateUsed}</div>
              </div>
            )}

            {/* Contact */}
            {request.projectData.submitterEmail && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  We'll send updates to <strong>{request.projectData.submitterEmail}</strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/request">
            <Button>Submit Another Request</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
