/**
 * TypeScript type definitions for Thinker
 */

import type {
  Request,
  ProjectData,
  Branding,
  ColorScheme,
  Section,
  Navigation,
  BusinessInfo,
  SeoMetadata,
  Inspiration,
  MediaAsset,
  RequestStatus,
  Priority,
  SectionType,
} from '@prisma/client';

// Re-export Prisma types
export type {
  Request,
  ProjectData,
  Branding,
  ColorScheme,
  Section,
  Navigation,
  BusinessInfo,
  SeoMetadata,
  Inspiration,
  MediaAsset,
  RequestStatus,
  Priority,
  SectionType,
};

// Request with all relations
export type RequestWithRelations = Request & {
  projectData: ProjectData | null;
  branding: Branding | null;
  colorScheme: ColorScheme | null;
  sections: Section[];
  navigation: Navigation | null;
  businessInfo: BusinessInfo | null;
  seoMetadata: SeoMetadata | null;
  inspirations: Inspiration[];
  mediaAssets: MediaAsset[];
};

// Simplified request for list views
export type RequestListItem = Request & {
  projectData: Pick<ProjectData, 'projectName' | 'submitterEmail'> | null;
};

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// File upload types
export interface UploadResponse {
  url: string;
  publicId: string;
}

// Template type
export interface Template {
  id: string;
  name: string;
  description: string;
  icon?: string;
  previewImage?: string;
  colorScheme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  sections: {
    sectionType: SectionType;
    title: string;
    orderIndex: number;
  }[];
}

// Form step types for multi-step form
export interface FormStep {
  id: number;
  name: string;
  title: string;
  description?: string;
}

// Query params for filtering requests
export interface RequestQueryParams {
  status?: RequestStatus;
  priority?: Priority;
  template?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'status';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

// Stats for admin dashboard
export interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
}
