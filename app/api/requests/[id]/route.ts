import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/requests/[id]
 *
 * Get request by tracking ID (public endpoint for users to check status)
 *
 * Returns basic request information without sensitive admin data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find request by tracking ID
    const requestData = await prisma.request.findUnique({
      where: {
        trackingId: id,
      },
      select: {
        id: true,
        trackingId: true,
        status: true,
        templateUsed: true,
        createdAt: true,
        updatedAt: true,
        completedAt: true,
        // Include project data for display
        projectData: {
          select: {
            projectName: true,
            websiteTitle: true,
            submitterEmail: true,
          },
        },
        // Exclude admin notes and other sensitive data
      },
    });

    // Check if request exists
    if (!requestData) {
      return Response.json(
        {
          error: 'Request not found',
          message: 'No request found with this tracking ID',
        },
        { status: 404 }
      );
    }

    // Return request data
    return Response.json({
      success: true,
      data: requestData,
    });
  } catch (error: any) {
    console.error('Request retrieval error:', error);

    return Response.json(
      {
        error: 'Failed to retrieve request',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
