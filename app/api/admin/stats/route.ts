import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/auth';

/**
 * GET /api/admin/stats
 *
 * Get dashboard statistics (admin only)
 *
 * Returns:
 * - Total requests count
 * - Count by status (pending, in progress, completed, cancelled)
 * - Recent requests (last 7 days)
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authError = await requireAdminAuth(request);
    if (authError) return authError;

    // Get counts for all statuses
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

    // Get priority counts
    const [highPriority, mediumPriority, lowPriority] = await Promise.all([
      prisma.request.count({ where: { priority: 'HIGH' } }),
      prisma.request.count({ where: { priority: 'MEDIUM' } }),
      prisma.request.count({ where: { priority: 'LOW' } }),
    ]);

    // Get template usage stats
    const templateStats = await prisma.request.groupBy({
      by: ['templateUsed'],
      _count: {
        templateUsed: true,
      },
      orderBy: {
        _count: {
          templateUsed: 'desc',
        },
      },
    });

    // Return statistics
    return Response.json({
      success: true,
      data: {
        total,
        byStatus: {
          pending,
          inProgress,
          completed,
          cancelled,
        },
        byPriority: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority,
        },
        recentRequests,
        templateUsage: templateStats,
      },
    });
  } catch (error: any) {
    console.error('Admin stats error:', error);

    return Response.json(
      {
        error: 'Failed to fetch statistics',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
