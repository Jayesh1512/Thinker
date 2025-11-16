/**
 * Application constants and configuration
 */

export const APP_NAME = 'Thinker';
export const APP_DESCRIPTION = 'Fortune 500 Website Request System';

export const REQUEST_STATUSES = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const PRIORITIES = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

export const SECTION_TYPES = {
  HERO: 'Hero',
  ABOUT: 'About',
  SERVICES: 'Services',
  FEATURES: 'Features',
  TEAM: 'Team',
  TESTIMONIALS: 'Testimonials',
  GALLERY: 'Gallery',
  CONTACT: 'Contact',
  CTA: 'Call to Action',
  CUSTOM: 'Custom',
} as const;

export const TEMPLATE_TYPES = {
  CORPORATE: 'Corporate/Business',
  PORTFOLIO: 'Portfolio',
  RESTAURANT: 'Restaurant',
  ECOMMERCE: 'E-commerce Landing',
  AGENCY: 'Agency',
  SAAS: 'Startup/SaaS',
  BLANK: 'Blank/Custom',
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml',
  'image/webp',
] as const;

export const ALLOWED_DOCUMENT_TYPES = ['application/pdf'] as const;
