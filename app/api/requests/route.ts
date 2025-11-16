import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTrackingId } from '@/lib/utils';
import { createRequestSchema } from '@/lib/validation';
import { ZodError } from 'zod';

/**
 * POST /api/requests
 *
 * Create a new website request
 *
 * Request body should contain all request data including:
 * - projectData (required)
 * - branding (optional)
 * - colorScheme (optional)
 * - sections (optional)
 * - navigation (optional)
 * - businessInfo (optional)
 * - seoMetadata (optional)
 * - inspirations (optional)
 * - mediaAssets (optional)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const validated = createRequestSchema.parse(body);

    // Generate unique tracking ID
    const trackingId = generateTrackingId();

    // Create request with all related data
    const newRequest = await prisma.request.create({
      data: {
        trackingId,
        templateUsed: validated.templateUsed,
        status: 'PENDING',
        priority: 'MEDIUM',

        // Create project data
        projectData: {
          create: {
            projectName: validated.projectData.projectName,
            websiteTitle: validated.projectData.websiteTitle,
            tagline: validated.projectData.tagline,
            industry: validated.projectData.industry,
            targetAudience: validated.projectData.targetAudience,
            description: validated.projectData.description,
            submitterName: validated.projectData.submitterName,
            submitterEmail: validated.projectData.submitterEmail,
          },
        },

        // Create branding (if provided)
        ...(validated.branding && {
          branding: {
            create: validated.branding,
          },
        }),

        // Create color scheme (if provided)
        ...(validated.colorScheme && {
          colorScheme: {
            create: validated.colorScheme,
          },
        }),

        // Create sections
        ...(validated.sections &&
          validated.sections.length > 0 && {
            sections: {
              create: validated.sections,
            },
          }),

        // Create navigation (if provided)
        ...(validated.navigation && {
          navigation: {
            create: validated.navigation,
          },
        }),

        // Create business info (if provided)
        ...(validated.businessInfo && {
          businessInfo: {
            create: validated.businessInfo,
          },
        }),

        // Create SEO metadata (if provided)
        ...(validated.seoMetadata && {
          seoMetadata: {
            create: validated.seoMetadata,
          },
        }),

        // Create inspirations
        ...(validated.inspirations &&
          validated.inspirations.length > 0 && {
            inspirations: {
              create: validated.inspirations,
            },
          }),

        // Create media assets
        ...(validated.mediaAssets &&
          validated.mediaAssets.length > 0 && {
            mediaAssets: {
              create: validated.mediaAssets,
            },
          }),
      },
      include: {
        projectData: true,
      },
    });

    // TODO: Send email notification (optional for v1.5+)
    // if (validated.projectData.submitterEmail) {
    //   await sendTrackingEmail(validated.projectData.submitterEmail, trackingId);
    // }

    // Return success response with tracking ID
    return Response.json(
      {
        success: true,
        trackingId,
        requestId: newRequest.id,
        message: 'Request submitted successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Request creation error:', error);

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

    // Handle database errors
    if (error.code === 'P2002') {
      return Response.json(
        {
          error: 'Duplicate request',
          details: 'A request with this tracking ID already exists',
        },
        { status: 409 }
      );
    }

    // Generic error response
    return Response.json(
      {
        error: 'Failed to create request',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
