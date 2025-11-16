import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import { updateRequestSchema } from '@/lib/validation';
import { ZodError } from 'zod';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/admin/requests/[id]
 * Get a single request with all details
 * Requires admin authentication
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    // Check admin authentication
    const isAuthorized = await checkAdminAuth(req);
    if (!isAuthorized) {
      return unauthorizedResponse();
    }

    const { id } = params;

    // Fetch request with all relations
    const request = await prisma.request.findUnique({
      where: { id },
      include: {
        projectData: true,
        branding: true,
        colorScheme: true,
        sections: {
          orderBy: { orderIndex: 'asc' },
        },
        navigation: true,
        businessInfo: true,
        seoMetadata: true,
        inspirations: true,
        mediaAssets: true,
      },
    });

    if (!request) {
      return NextResponse.json(
        {
          success: false,
          error: 'Request not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Error fetching request:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/requests/[id]
 * Update request status, priority, or admin notes
 * Requires admin authentication
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    // Check admin authentication
    const isAuthorized = await checkAdminAuth(req);
    if (!isAuthorized) {
      return unauthorizedResponse();
    }

    const { id } = params;

    // Parse and validate request body
    const body = await req.json();
    const validated = updateRequestSchema.parse(body);

    // Update request
    const request = await prisma.request.update({
      where: { id },
      data: {
        ...(validated.status && { status: validated.status }),
        ...(validated.priority && { priority: validated.priority }),
        ...(validated.adminNotes !== undefined && { adminNotes: validated.adminNotes }),
        // Set completedAt when status changes to COMPLETED
        ...(validated.status === 'COMPLETED' && { completedAt: new Date() }),
        // Clear completedAt if status changes from COMPLETED to something else
        ...(validated.status && validated.status !== 'COMPLETED' && { completedAt: null }),
      },
      include: {
        projectData: {
          select: {
            projectName: true,
            submitterEmail: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Request updated successfully',
      data: request,
    });
  } catch (error) {
    console.error('Error updating request:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle not found
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Request not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/requests/[id]
 * Delete a request (cascade deletes all related data)
 * Requires admin authentication
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    // Check admin authentication
    const isAuthorized = await checkAdminAuth(req);
    if (!isAuthorized) {
      return unauthorizedResponse();
    }

    const { id } = params;

    // Delete request (cascades to all related tables)
    await prisma.request.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Request deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting request:', error);

    // Handle not found
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Request not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
