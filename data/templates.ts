import { SectionType } from '@prisma/client';
import type { Template } from '@/types';

/**
 * Template definitions for website types
 */

export const templates: Template[] = [
  {
    id: 'corporate',
    name: 'Corporate/Business',
    description:
      'Professional business websites with services, team, and testimonials sections. Perfect for consulting firms and B2B companies.',
    previewImage: '/templates/corporate.jpg',
    colorScheme: {
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
    },
    sections: [
      { sectionType: 'HERO', title: 'Hero Section', orderIndex: 0 },
      { sectionType: 'ABOUT', title: 'About Us', orderIndex: 1 },
      { sectionType: 'SERVICES', title: 'Our Services', orderIndex: 2 },
      { sectionType: 'TEAM', title: 'Our Team', orderIndex: 3 },
      { sectionType: 'TESTIMONIALS', title: 'Client Testimonials', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Contact Us', orderIndex: 5 },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description:
      'Showcase your work with a clean, minimal portfolio. Ideal for designers, developers, photographers, and creatives.',
    previewImage: '/templates/portfolio.jpg',
    colorScheme: {
      primaryColor: '#000000',
      secondaryColor: '#374151',
      accentColor: '#10b981',
    },
    sections: [
      { sectionType: 'HERO', title: 'Introduction', orderIndex: 0 },
      { sectionType: 'GALLERY', title: 'Portfolio Gallery', orderIndex: 1 },
      { sectionType: 'ABOUT', title: 'About Me', orderIndex: 2 },
      { sectionType: 'TESTIMONIALS', title: 'Testimonials', orderIndex: 3 },
      { sectionType: 'CONTACT', title: 'Get In Touch', orderIndex: 4 },
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description:
      'Appetizing restaurant websites with menu displays, reservations, and gallery. Perfect for cafes and food businesses.',
    previewImage: '/templates/restaurant.jpg',
    colorScheme: {
      primaryColor: '#dc2626',
      secondaryColor: '#ea580c',
      accentColor: '#fbbf24',
    },
    sections: [
      { sectionType: 'HERO', title: 'Welcome', orderIndex: 0 },
      { sectionType: 'ABOUT', title: 'Our Story', orderIndex: 1 },
      { sectionType: 'SERVICES', title: 'Our Menu', orderIndex: 2 },
      { sectionType: 'GALLERY', title: 'Food Gallery', orderIndex: 3 },
      { sectionType: 'CTA', title: 'Make a Reservation', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Location & Hours', orderIndex: 5 },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Landing',
    description:
      'Product-focused landing pages with features and CTAs. Great for product launches and online stores.',
    previewImage: '/templates/ecommerce.jpg',
    colorScheme: {
      primaryColor: '#7c3aed',
      secondaryColor: '#a78bfa',
      accentColor: '#ec4899',
    },
    sections: [
      { sectionType: 'HERO', title: 'Product Hero', orderIndex: 0 },
      { sectionType: 'FEATURES', title: 'Key Benefits', orderIndex: 1 },
      { sectionType: 'GALLERY', title: 'Product Gallery', orderIndex: 2 },
      { sectionType: 'TESTIMONIALS', title: 'Customer Reviews', orderIndex: 3 },
      { sectionType: 'CTA', title: 'Special Offer', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Support', orderIndex: 5 },
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    description:
      'Modern agency websites highlighting services, case studies, and team. Perfect for marketing and design studios.',
    previewImage: '/templates/agency.jpg',
    colorScheme: {
      primaryColor: '#0891b2',
      secondaryColor: '#06b6d4',
      accentColor: '#f59e0b',
    },
    sections: [
      { sectionType: 'HERO', title: 'Agency Hero', orderIndex: 0 },
      { sectionType: 'SERVICES', title: 'What We Offer', orderIndex: 1 },
      { sectionType: 'GALLERY', title: 'Case Studies', orderIndex: 2 },
      { sectionType: 'TEAM', title: 'Meet The Team', orderIndex: 3 },
      { sectionType: 'FEATURES', title: 'Our Process', orderIndex: 4 },
      { sectionType: 'CONTACT', title: 'Start a Project', orderIndex: 5 },
    ],
  },
  {
    id: 'saas',
    name: 'Startup/SaaS',
    description:
      'Tech-forward startup landing pages with features and pricing. Ideal for software products and tech companies.',
    previewImage: '/templates/saas.jpg',
    colorScheme: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#a78bfa',
      accentColor: '#3b82f6',
    },
    sections: [
      { sectionType: 'HERO', title: 'Product Value Proposition', orderIndex: 0 },
      { sectionType: 'FEATURES', title: 'Key Features', orderIndex: 1 },
      { sectionType: 'SERVICES', title: 'How It Works', orderIndex: 2 },
      { sectionType: 'SERVICES', title: 'Pricing Plans', orderIndex: 3 },
      { sectionType: 'TESTIMONIALS', title: 'User Reviews', orderIndex: 4 },
      { sectionType: 'CTA', title: 'Get Started', orderIndex: 5 },
    ],
  },
  {
    id: 'blank',
    name: 'Blank/Custom',
    description:
      'Start from scratch with a blank canvas. Build your website exactly how you envision it.',
    previewImage: '/templates/blank.jpg',
    colorScheme: {
      primaryColor: '#000000',
      secondaryColor: '#6b7280',
      accentColor: '#3b82f6',
    },
    sections: [],
  },
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Get section types for a template
 */
export function getTemplateSections(templateId: string): Template['sections'] {
  const template = getTemplateById(templateId);
  return template?.sections || [];
}
