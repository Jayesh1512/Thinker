import { SectionType } from '@prisma/client';

/**
 * Project template definitions
 */

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string; // Emoji or icon identifier
  defaultSections: {
    sectionType: SectionType;
    title: string;
    subtitle?: string;
    orderIndex: number;
  }[];
  defaultColors?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export const templates: TemplateDefinition[] = [
  {
    id: 'corporate',
    name: 'Corporate/Business',
    description: 'Professional business website with services and team sections',
    category: 'Business',
    icon: '🏢',
    defaultSections: [
      { sectionType: 'HERO', title: 'Welcome', orderIndex: 0 },
      { sectionType: 'ABOUT', title: 'About Us', orderIndex: 1 },
      { sectionType: 'SERVICES', title: 'Our Services', orderIndex: 2 },
      { sectionType: 'TEAM', title: 'Our Team', orderIndex: 3 },
      { sectionType: 'TESTIMONIALS', title: 'Client Testimonials', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Get In Touch', orderIndex: 5 },
    ],
    defaultColors: {
      primaryColor: '#1E40AF',
      secondaryColor: '#64748B',
      accentColor: '#0EA5E9',
    },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work with projects and testimonials',
    category: 'Creative',
    icon: '🎨',
    defaultSections: [
      { sectionType: 'HERO', title: 'Welcome', subtitle: 'Creative Professional', orderIndex: 0 },
      { sectionType: 'ABOUT', title: 'About Me', orderIndex: 1 },
      { sectionType: 'GALLERY', title: 'My Work', orderIndex: 2 },
      { sectionType: 'TESTIMONIALS', title: 'Client Reviews', orderIndex: 3 },
      { sectionType: 'CONTACT', title: 'Get In Touch', orderIndex: 4 },
    ],
    defaultColors: {
      primaryColor: '#0F172A',
      secondaryColor: '#475569',
      accentColor: '#F59E0B',
    },
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Food and dining website with menu and reservations',
    category: 'Food & Beverage',
    icon: '🍽️',
    defaultSections: [
      { sectionType: 'HERO', title: 'Welcome', orderIndex: 0 },
      { sectionType: 'ABOUT', title: 'Our Story', orderIndex: 1 },
      { sectionType: 'SERVICES', title: 'Menu', orderIndex: 2 },
      { sectionType: 'GALLERY', title: 'Food Gallery', orderIndex: 3 },
      { sectionType: 'CTA', title: 'Make a Reservation', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Visit Us', orderIndex: 5 },
    ],
    defaultColors: {
      primaryColor: '#DC2626',
      secondaryColor: '#78350F',
      accentColor: '#F59E0B',
    },
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Landing',
    description: 'Product landing page with features and testimonials',
    category: 'E-commerce',
    icon: '🛒',
    defaultSections: [
      { sectionType: 'HERO', title: 'Product Showcase', orderIndex: 0 },
      { sectionType: 'FEATURES', title: 'Key Features', orderIndex: 1 },
      { sectionType: 'SERVICES', title: 'Products', orderIndex: 2 },
      { sectionType: 'TESTIMONIALS', title: 'Customer Reviews', orderIndex: 3 },
      { sectionType: 'CTA', title: 'Special Offer', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Support', orderIndex: 5 },
    ],
    defaultColors: {
      primaryColor: '#7C3AED',
      secondaryColor: '#DB2777',
      accentColor: '#F59E0B',
    },
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Marketing or design agency website',
    category: 'Business',
    icon: '🚀',
    defaultSections: [
      { sectionType: 'HERO', title: 'Transform Your Brand', orderIndex: 0 },
      { sectionType: 'SERVICES', title: 'What We Offer', orderIndex: 1 },
      { sectionType: 'GALLERY', title: 'Case Studies', orderIndex: 2 },
      { sectionType: 'TEAM', title: 'Meet The Team', orderIndex: 3 },
      { sectionType: 'FEATURES', title: 'Our Process', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Start A Project', orderIndex: 5 },
    ],
    defaultColors: {
      primaryColor: '#EC4899',
      secondaryColor: '#8B5CF6',
      accentColor: '#F59E0B',
    },
  },
  {
    id: 'saas',
    name: 'Startup/SaaS',
    description: 'Software product or tech startup landing page',
    category: 'Technology',
    icon: '💻',
    defaultSections: [
      { sectionType: 'HERO', title: 'Product Value Prop', orderIndex: 0 },
      { sectionType: 'FEATURES', title: 'Key Features', orderIndex: 1 },
      { sectionType: 'SERVICES', title: 'How It Works', orderIndex: 2 },
      { sectionType: 'TESTIMONIALS', title: 'User Reviews', orderIndex: 3 },
      { sectionType: 'CTA', title: 'Get Started', orderIndex: 4 },
    ],
    defaultColors: {
      primaryColor: '#6366F1',
      secondaryColor: '#8B5CF6',
      accentColor: '#06B6D4',
    },
  },
  {
    id: 'blank',
    name: 'Blank/Custom',
    description: 'Start from scratch with no predefined sections',
    category: 'Custom',
    icon: '📄',
    defaultSections: [
      { sectionType: 'HERO', title: 'Hero Section', orderIndex: 0 },
    ],
    defaultColors: {
      primaryColor: '#3B82F6',
      secondaryColor: '#64748B',
      accentColor: '#F59E0B',
    },
  },
];

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return templates.find((t) => t.id === id);
}
