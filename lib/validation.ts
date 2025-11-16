import { z } from 'zod';

/**
 * Validation schemas using Zod for API request/response validation
 */

// Enum schemas
export const requestStatusSchema = z.enum([
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
]);

export const prioritySchema = z.enum(['HIGH', 'MEDIUM', 'LOW']);

export const sectionTypeSchema = z.enum([
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
]);

// Project Data Schema
export const projectDataSchema = z.object({
  projectName: z.string().min(1, 'Project name is required').max(200),
  websiteTitle: z.string().min(1, 'Website title is required').max(200),
  tagline: z.string().max(300).optional().nullable(),
  industry: z.string().max(100).optional().nullable(),
  targetAudience: z.string().max(500).optional().nullable(),
  description: z.string().max(5000).optional().nullable(),
  submitterName: z.string().max(100).optional().nullable(),
  submitterEmail: z.string().email('Invalid email').optional().nullable(),
});

// Branding Schema
export const brandingSchema = z.object({
  primaryLogoUrl: z.string().url().optional().nullable(),
  alternateLogoUrl: z.string().url().optional().nullable(),
  faviconUrl: z.string().url().optional().nullable(),
  brandGuidelinesUrl: z.string().url().optional().nullable(),
});

// Color Scheme Schema
export const colorSchemeSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  backgroundLight: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  backgroundDark: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  textPrimary: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  textSecondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
  presetTheme: z.string().max(50).optional().nullable(),
});

// Section Schema
export const sectionSchema = z.object({
  orderIndex: z.number().int().min(0),
  sectionType: sectionTypeSchema,
  title: z.string().max(200).optional().nullable(),
  subtitle: z.string().max(300).optional().nullable(),
  content: z.any().optional().nullable(), // JSON content
  layout: z.string().max(50).optional().nullable(),
  backgroundStyle: z.string().max(100).optional().nullable(),
  isVisible: z.boolean().default(true),
});

// Navigation Schema
export const navigationSchema = z.object({
  menuItems: z.any().optional().nullable(), // JSON array
  footerContent: z.any().optional().nullable(), // JSON object
});

// Business Info Schema
export const businessInfoSchema = z.object({
  email: z.string().email().optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  hours: z.string().max(500).optional().nullable(),
  socialLinks: z.any().optional().nullable(), // JSON object
});

// SEO Metadata Schema
export const seoMetadataSchema = z.object({
  metaTitle: z.string().max(200).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  keywords: z.string().max(500).optional().nullable(),
  ogImageUrl: z.string().url().optional().nullable(),
});

// Inspiration Schema
export const inspirationSchema = z.object({
  websiteUrl: z.string().url('Invalid URL'),
  notes: z.string().max(2000).optional().nullable(),
  screenshotUrl: z.string().url().optional().nullable(),
});

// Media Asset Schema
export const mediaAssetSchema = z.object({
  assetType: z.enum(['logo', 'image', 'video', 'document']),
  fileUrl: z.string().url('Invalid file URL'),
  fileName: z.string().max(255).optional().nullable(),
  fileSize: z.number().int().positive().optional().nullable(),
  mimeType: z.string().max(100).optional().nullable(),
  altText: z.string().max(200).optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  sectionId: z.string().optional().nullable(),
});

// Complete Request Schema (for POST /api/requests)
export const createRequestSchema = z.object({
  templateUsed: z.string().max(50).optional().nullable(),
  projectData: projectDataSchema,
  branding: brandingSchema.optional(),
  colorScheme: colorSchemeSchema.optional(),
  sections: z.array(sectionSchema).optional().default([]),
  navigation: navigationSchema.optional(),
  businessInfo: businessInfoSchema.optional(),
  seoMetadata: seoMetadataSchema.optional(),
  inspirations: z.array(inspirationSchema).optional().default([]),
  mediaAssets: z.array(mediaAssetSchema).optional().default([]),
});

// Update Request Schema (for PATCH /api/admin/requests/[id])
export const updateRequestSchema = z.object({
  status: requestStatusSchema.optional(),
  priority: prioritySchema.optional(),
  adminNotes: z.string().max(10000).optional().nullable(),
  completedAt: z.string().datetime().optional().nullable(),
});

// File Upload Schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  folder: z.string().max(100).optional().default('thinker-requests'),
});

// Query Params Schema for GET /api/admin/requests
export const adminRequestsQuerySchema = z.object({
  status: requestStatusSchema.optional(),
  priority: prioritySchema.optional(),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'status', 'priority'])
    .optional()
    .default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
});

// Type exports
export type CreateRequestInput = z.infer<typeof createRequestSchema>;
export type UpdateRequestInput = z.infer<typeof updateRequestSchema>;
export type AdminRequestsQuery = z.infer<typeof adminRequestsQuerySchema>;
export type ProjectDataInput = z.infer<typeof projectDataSchema>;
export type SectionInput = z.infer<typeof sectionSchema>;
