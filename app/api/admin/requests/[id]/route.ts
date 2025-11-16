import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/auth';
import { updateRequestSchema } from '@/lib/validation';
import { ZodError } from 'zod';

/**
 * GET /api/admin/requests/[id]
 *
 * Get full request details by ID (admin only)
 *
 * Returns complete request data with all relations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authError = await requireAdminAuth(request);
    if (authError) return authError;

    const { id } = params;

    // Fetch complete request with all relations
    const requestData = await prisma.request.findUnique({
      where: { id },
      include: {
        projectData: true,
        branding: true,
        colorScheme: true,
        sections: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
        navigation: true,
        businessInfo: true,
        seoMetadata: true,
        inspirations: true,
        mediaAssets: true,
      },
    });

    // Check if request exists
    if (!requestData) {
      return Response.json(
        {
          error: 'Request not found',
          message: 'No request found with this ID',
        },
        { status: 404 }
      );
    }

    // Return complete request data
    return Response.json({
      success: true,
      data: requestData,
    });
  } catch (error: any) {
    console.error('Admin request detail error:', error);

    return Response.json(
      {
        error: 'Failed to retrieve request',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/requests/[id]
 *
 * Update request (admin only)
 *
 * Can update:
 * - status
 * - priority
 * - adminNotes
 * - completedAt
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authError = await requireAdminAuth(request);
    if (authError) return authError;

    const { id } = params;

    // Parse and validate request body
    const body = await request.json();
    const validated = updateRequestSchema.parse(body);

    // Check if request exists
    const existingRequest = await prisma.request.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return Response.json(
        {
          error: 'Request not found',
          message: 'No request found with this ID',
        },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (validated.status !== undefined) {
      updateData.status = validated.status;

      // Auto-set completedAt when status changes to COMPLETED
      if (validated.status === 'COMPLETED' && !existingRequest.completedAt) {
        updateData.completedAt = new Date();
      }

      // Clear completedAt if status changes from COMPLETED
      if (validated.status !== 'COMPLETED' && existingRequest.completedAt) {
        updateData.completedAt = null;
      }
    }

    if (validated.priority !== undefined) {
      updateData.priority = validated.priority;
    }

    if (validated.adminNotes !== undefined) {
      updateData.adminNotes = validated.adminNotes;
    }

    // Allow manual completedAt override
    if (validated.completedAt !== undefined) {
      updateData.completedAt = validated.completedAt
        ? new Date(validated.completedAt)
        : null;
    }

    // Update request
    const updatedRequest = await prisma.request.update({
      where: { id },
      data: updateData,
      include: {
        projectData: true,
      },
    });

    // Return updated request
    return Response.json({
      success: true,
      data: updatedRequest,
      message: 'Request updated successfully',
    });
  } catch (error: any) {
    console.error('Admin request update error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return Response.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        error: 'Failed to update request',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/requests/[id]
 *
 * Delete request (admin only)
 *
 * Permanently deletes a request and all related data
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authError = await requireAdminAuth(request);
    if (authError) return authError;

    const { id } = params;

    // Check if request exists
    const existingRequest = await prisma.request.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return Response.json(
        {
          error: 'Request not found',
          message: 'No request found with this ID',
        },
        { status: 404 }
      );
    }

    // Delete request (cascade will delete all related data)
    await prisma.request.delete({
      where: { id },
    });

    // Return success response
    return Response.json({
      success: true,
      message: 'Request deleted successfully',
    });
  } catch (error: any) {
    console.error('Admin request delete error:', error);

    return Response.json(
      {
        error: 'Failed to delete request',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
