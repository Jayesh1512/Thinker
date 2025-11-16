import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/auth';
import { adminRequestsQuerySchema } from '@/lib/validation';
import { Prisma } from '@prisma/client';

/**
 * GET /api/admin/requests
 *
 * List all requests with filtering, sorting, and pagination
 *
 * Query parameters:
 * - status: Filter by status (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
 * - priority: Filter by priority (HIGH, MEDIUM, LOW)
 * - sortBy: Sort field (createdAt, updatedAt, status, priority)
 * - order: Sort order (asc, desc)
 * - search: Search in project name or tracking ID
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authError = await requireAdminAuth(request);
    if (authError) return authError;

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const query = adminRequestsQuerySchema.parse({
      status: searchParams.get('status'),
      priority: searchParams.get('priority'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      order: searchParams.get('order') || 'desc',
      search: searchParams.get('search'),
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
    });

    // Build where clause
    const where: Prisma.RequestWhereInput = {};

    // Filter by status
    if (query.status) {
      where.status = query.status;
    }

    // Filter by priority
    if (query.priority) {
      where.priority = query.priority;
    }

    // Search functionality
    if (query.search) {
      where.OR = [
        {
          trackingId: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          projectData: {
            projectName: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          projectData: {
            websiteTitle: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    // Calculate pagination
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;

    // Get total count
    const total = await prisma.request.count({ where });

    // Fetch requests
    const requests = await prisma.request.findMany({
      where,
      skip,
      take,
      orderBy: {
        [query.sortBy]: query.order,
      },
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
            mediaAssets: true,
            inspirations: true,
          },
        },
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(total / query.limit);

    // Return paginated response
    return Response.json({
      success: true,
      data: requests,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error('Admin requests list error:', error);

    return Response.json(
      {
        error: 'Failed to fetch requests',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/requests (stats)
 *
 * Get dashboard statistics
 *
 * Add ?stats=true to get statistics instead of list
 */
export async function getStats() {
  const [total, pending, inProgress, completed, cancelled] = await Promise.all([
    prisma.request.count(),
    prisma.request.count({ where: { status: 'PENDING' } }),
    prisma.request.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.request.count({ where: { status: 'COMPLETED' } }),
    prisma.request.count({ where: { status: 'CANCELLED' } }),
  ]);

  // Get recent requests (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentRequests = await prisma.request.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
  });

  return {
    total,
    pending,
    inProgress,
    completed,
    cancelled,
    recentRequests,
  };
}
