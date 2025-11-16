import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestSchema } from '@/lib/validation';
import { generateTrackingId } from '@/lib/utils';
import { ZodError } from 'zod';

/**
 * POST /api/requests
 * Create a new website request
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate request data
    const validated = requestSchema.parse(body);

    // Generate unique tracking ID
    const trackingId = generateTrackingId();

    // Create request with all relations in a transaction
    const request = await prisma.request.create({
      data: {
        trackingId,
        templateUsed: validated.templateUsed,

        // Project data (required)
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

        // Branding (optional)
        ...(validated.branding && {
          branding: {
            create: {
              primaryLogoUrl: validated.branding.primaryLogoUrl,
              alternateLogoUrl: validated.branding.alternateLogoUrl,
              faviconUrl: validated.branding.faviconUrl,
              brandGuidelinesUrl: validated.branding.brandGuidelinesUrl,
            },
          },
        }),

        // Color scheme (optional)
        ...(validated.colorScheme && {
          colorScheme: {
            create: {
              primaryColor: validated.colorScheme.primaryColor,
              secondaryColor: validated.colorScheme.secondaryColor,
              accentColor: validated.colorScheme.accentColor,
              backgroundLight: validated.colorScheme.backgroundLight,
              backgroundDark: validated.colorScheme.backgroundDark,
              textPrimary: validated.colorScheme.textPrimary,
              textSecondary: validated.colorScheme.textSecondary,
              presetTheme: validated.colorScheme.presetTheme,
            },
          },
        }),

        // Sections (optional)
        ...(validated.sections &&
          validated.sections.length > 0 && {
            sections: {
              create: validated.sections.map((section) => ({
                orderIndex: section.orderIndex,
                sectionType: section.sectionType,
                title: section.title,
                subtitle: section.subtitle,
                content: section.content,
                layout: section.layout,
                backgroundStyle: section.backgroundStyle,
                isVisible: section.isVisible,
              })),
            },
          }),

        // Navigation (optional)
        ...(validated.navigation && {
          navigation: {
            create: {
              menuItems: validated.navigation.menuItems,
              footerContent: validated.navigation.footerContent,
            },
          },
        }),

        // Business info (optional)
        ...(validated.businessInfo && {
          businessInfo: {
            create: {
              email: validated.businessInfo.email,
              phone: validated.businessInfo.phone,
              address: validated.businessInfo.address,
              hours: validated.businessInfo.hours,
              socialLinks: validated.businessInfo.socialLinks,
            },
          },
        }),

        // SEO metadata (optional)
        ...(validated.seoMetadata && {
          seoMetadata: {
            create: {
              metaTitle: validated.seoMetadata.metaTitle,
              metaDescription: validated.seoMetadata.metaDescription,
              keywords: validated.seoMetadata.keywords,
              ogImageUrl: validated.seoMetadata.ogImageUrl,
            },
          },
        }),

        // Inspirations (optional)
        ...(validated.inspirations &&
          validated.inspirations.length > 0 && {
            inspirations: {
              create: validated.inspirations.map((inspiration) => ({
                websiteUrl: inspiration.websiteUrl,
                notes: inspiration.notes,
                screenshotUrl: inspiration.screenshotUrl,
              })),
            },
          }),

        // Media assets (optional)
        ...(validated.mediaAssets &&
          validated.mediaAssets.length > 0 && {
            mediaAssets: {
              create: validated.mediaAssets.map((asset) => ({
                assetType: asset.assetType,
                fileUrl: asset.fileUrl,
                fileName: asset.fileName,
                fileSize: asset.fileSize,
                mimeType: asset.mimeType,
                altText: asset.altText,
                description: asset.description,
                sectionId: asset.sectionId,
              })),
            },
          }),
      },
      include: {
        projectData: true,
      },
    });

    // TODO: Send email notification with tracking ID (v1.5)
    // if (validated.projectData.submitterEmail) {
    //   await sendTrackingEmail(validated.projectData.submitterEmail, trackingId);
    // }

    // Return success response with tracking ID
    return NextResponse.json(
      {
        success: true,
        trackingId,
        message: 'Request submitted successfully',
        data: {
          id: request.id,
          trackingId: request.trackingId,
          projectName: request.projectData?.projectName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating request:', error);

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

    // Handle database errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create request',
          message: error.message,
        },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/requests?trackingId=XXX
 * Get request by tracking ID (for public status tracking - v1.5)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingId = searchParams.get('trackingId');

    if (!trackingId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tracking ID is required',
        },
        { status: 400 }
      );
    }

    // Find request by tracking ID
    const request = await prisma.request.findUnique({
      where: { trackingId },
      select: {
        id: true,
        trackingId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        completedAt: true,
        projectData: {
          select: {
            projectName: true,
            websiteTitle: true,
          },
        },
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
      },
      { status: 500 }
    );
  }
}
