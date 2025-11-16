import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import type { RequestStatus, Priority, Prisma } from '@prisma/client';

/**
 * GET /api/admin/requests
 * Get all requests with filtering, sorting, and pagination
 * Requires admin authentication
 */
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const isAuthorized = await checkAdminAuth(req);
    if (!isAuthorized) {
      return unauthorizedResponse();
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as RequestStatus | null;
    const priority = searchParams.get('priority') as Priority | null;
    const template = searchParams.get('template');
    const search = searchParams.get('search');
    const sortBy = (searchParams.get('sortBy') as
      | 'createdAt'
      | 'updatedAt'
      | 'priority'
      | 'status'
      | null) || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc' | null) || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    // Build where clause
    const where: Prisma.RequestWhereInput = {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(template && { templateUsed: template }),
      ...(search && {
        OR: [
          { trackingId: { contains: search, mode: 'insensitive' } },
          {
            projectData: {
              projectName: { contains: search, mode: 'insensitive' },
            },
          },
          {
            projectData: {
              websiteTitle: { contains: search, mode: 'insensitive' },
            },
          },
          {
            projectData: {
              submitterEmail: { contains: search, mode: 'insensitive' },
            },
          },
        ],
      }),
    };

    // Get total count
    const total = await prisma.request.count({ where });

    // Calculate pagination
    const totalPages = Math.ceil(total / pageSize);
    const skip = (page - 1) * pageSize;

    // Fetch requests
    const requests = await prisma.request.findMany({
      where,
      include: {
        projectData: {
          select: {
            projectName: true,
            websiteTitle: true,
            submitterName: true,
            submitterEmail: true,
          },
        },
        _count: {
          select: {
            sections: true,
            inspirations: true,
            mediaAssets: true,
          },
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: pageSize,
    });

    // Get statistics
    const stats = await prisma.request.groupBy({
      by: ['status'],
      _count: true,
    });

    const statsMap = {
      total,
      pending: stats.find((s) => s.status === 'PENDING')?._count || 0,
      inProgress: stats.find((s) => s.status === 'IN_PROGRESS')?._count || 0,
      completed: stats.find((s) => s.status === 'COMPLETED')?._count || 0,
      cancelled: stats.find((s) => s.status === 'CANCELLED')?._count || 0,
    };

    return NextResponse.json({
      success: true,
      data: requests,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
      stats: statsMap,
    });
  } catch (error) {
    console.error('Error fetching requests:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch requests',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
