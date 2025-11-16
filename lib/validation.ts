import { z } from 'zod';

/**
 * Validation schemas for Thinker API
 */

// Section validation schema
export const sectionSchema = z.object({
  orderIndex: z.number().int().min(0),
  sectionType: z.enum([
    'HERO',
    'ABOUT',
    'SERVICES',
    'FEATURES',
    'TEAM',
    'TESTIMONIALS',
    'GALLERY',
    'CONTACT',
    'CTA',
    'CUSTOM',
  ]),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  content: z.any().optional().nullable(), // JSON content
  layout: z.string().optional().nullable(),
  backgroundStyle: z.string().optional().nullable(),
  isVisible: z.boolean().default(true),
});

// Inspiration validation schema
export const inspirationSchema = z.object({
  websiteUrl: z.string().url('Please enter a valid URL'),
  notes: z.string().optional().nullable(),
  screenshotUrl: z.string().url().optional().nullable(),
});

// Media asset validation schema
export const mediaAssetSchema = z.object({
  assetType: z.string(),
  fileUrl: z.string().url(),
  fileName: z.string().optional().nullable(),
  fileSize: z.number().int().optional().nullable(),
  mimeType: z.string().optional().nullable(),
  altText: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  sectionId: z.string().optional().nullable(),
});

// Main request validation schema
export const requestSchema = z.object({
  templateUsed: z.string().optional().nullable(),

  // Project data
  projectData: z.object({
    projectName: z.string().min(1, 'Project name is required'),
    websiteTitle: z.string().min(1, 'Website title is required'),
    tagline: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    targetAudience: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    submitterName: z.string().optional().nullable(),
    submitterEmail: z.string().email('Invalid email address').optional().nullable(),
  }),

  // Branding
  branding: z
    .object({
      primaryLogoUrl: z.string().url().optional().nullable(),
      alternateLogoUrl: z.string().url().optional().nullable(),
      faviconUrl: z.string().url().optional().nullable(),
      brandGuidelinesUrl: z.string().url().optional().nullable(),
    })
    .optional()
    .nullable(),

  // Color scheme
  colorScheme: z
    .object({
      primaryColor: z.string().optional().nullable(),
      secondaryColor: z.string().optional().nullable(),
      accentColor: z.string().optional().nullable(),
      backgroundLight: z.string().optional().nullable(),
      backgroundDark: z.string().optional().nullable(),
      textPrimary: z.string().optional().nullable(),
      textSecondary: z.string().optional().nullable(),
      presetTheme: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),

  // Sections
  sections: z.array(sectionSchema).optional().default([]),

  // Navigation
  navigation: z
    .object({
      menuItems: z.any().optional().nullable(), // JSON array
      footerContent: z.any().optional().nullable(), // JSON object
    })
    .optional()
    .nullable(),

  // Business info
  businessInfo: z
    .object({
      email: z.string().email().optional().nullable(),
      phone: z.string().optional().nullable(),
      address: z.string().optional().nullable(),
      hours: z.string().optional().nullable(),
      socialLinks: z.any().optional().nullable(), // JSON object
    })
    .optional()
    .nullable(),

  // SEO metadata
  seoMetadata: z
    .object({
      metaTitle: z.string().optional().nullable(),
      metaDescription: z.string().optional().nullable(),
      keywords: z.string().optional().nullable(),
      ogImageUrl: z.string().url().optional().nullable(),
    })
    .optional()
    .nullable(),

  // Inspirations
  inspirations: z.array(inspirationSchema).optional().default([]),

  // Media assets
  mediaAssets: z.array(mediaAssetSchema).optional().default([]),
});

// Admin update request schema
export const updateRequestSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
  adminNotes: z.string().optional().nullable(),
});

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z.any(), // Will be validated separately
  folder: z.string().optional().default('thinker-requests'),
});

// Export types
export type RequestInput = z.infer<typeof requestSchema>;
export type UpdateRequestInput = z.infer<typeof updateRequestSchema>;
export type SectionInput = z.infer<typeof sectionSchema>;
export type InspirationInput = z.infer<typeof inspirationSchema>;
export type MediaAssetInput = z.infer<typeof mediaAssetSchema>;
