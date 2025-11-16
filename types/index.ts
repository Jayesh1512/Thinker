/**
 * TypeScript types for Thinker application
 */

import { Request, RequestStatus, Priority, SectionType } from '@prisma/client';

// Re-export Prisma types
export type { Request, RequestStatus, Priority, SectionType };

/**
 * API Response Types
 */

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Request Types
 */

export interface RequestWithRelations extends Request {
  projectData?: ProjectData | null;
  branding?: Branding | null;
  colorScheme?: ColorScheme | null;
  sections?: Section[];
  navigation?: Navigation | null;
  businessInfo?: BusinessInfo | null;
  seoMetadata?: SeoMetadata | null;
  inspirations?: Inspiration[];
  mediaAssets?: MediaAsset[];
}

export interface ProjectData {
  id: string;
  requestId: string;
  projectName: string;
  websiteTitle: string;
  tagline?: string | null;
  industry?: string | null;
  targetAudience?: string | null;
  description?: string | null;
  submitterName?: string | null;
  submitterEmail?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Branding {
  id: string;
  requestId: string;
  primaryLogoUrl?: string | null;
  alternateLogoUrl?: string | null;
  faviconUrl?: string | null;
  brandGuidelinesUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorScheme {
  id: string;
  requestId: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  accentColor?: string | null;
  backgroundLight?: string | null;
  backgroundDark?: string | null;
  textPrimary?: string | null;
  textSecondary?: string | null;
  presetTheme?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Section {
  id: string;
  requestId: string;
  orderIndex: number;
  sectionType: SectionType;
  title?: string | null;
  subtitle?: string | null;
  content?: any; // JSON
  layout?: string | null;
  backgroundStyle?: string | null;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Navigation {
  id: string;
  requestId: string;
  menuItems?: any; // JSON
  footerContent?: any; // JSON
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessInfo {
  id: string;
  requestId: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  hours?: string | null;
  socialLinks?: any; // JSON
  createdAt: Date;
  updatedAt: Date;
}

export interface SeoMetadata {
  id: string;
  requestId: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  ogImageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inspiration {
  id: string;
  requestId: string;
  websiteUrl: string;
  notes?: string | null;
  screenshotUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaAsset {
  id: string;
  requestId: string;
  assetType: string;
  fileUrl: string;
  fileName?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  altText?: string | null;
  description?: string | null;
  sectionId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Upload Types
 */

export interface UploadResult {
  url: string;
  publicId: string;
}

/**
 * Template Types
 */

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  previewImage?: string;
  defaultSections: SectionType[];
  defaultColors?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

/**
 * Form Step Types
 */

export enum FormStep {
  BASIC_INFO = 'basic-info',
  BRANDING = 'branding',
  COLORS = 'colors',
  SECTIONS = 'sections',
  NAVIGATION = 'navigation',
  CONTACT_SEO = 'contact-seo',
  INSPIRATION = 'inspiration',
  REVIEW = 'review',
}

/**
 * Statistics Types
 */

export interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  recentRequests: number;
}
