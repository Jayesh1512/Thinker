import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SectionType } from '@prisma/client';

/**
 * Form state management using Zustand
 * Persists to localStorage for auto-save functionality
 */

export interface SectionData {
  orderIndex: number;
  sectionType: SectionType;
  title?: string;
  subtitle?: string;
  content?: any;
  layout?: string;
  backgroundStyle?: string;
  isVisible: boolean;
}

export interface InspirationData {
  websiteUrl: string;
  notes?: string;
  screenshotUrl?: string;
}

export interface MediaAssetData {
  assetType: 'logo' | 'image' | 'video' | 'document';
  fileUrl: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  altText?: string;
  description?: string;
  sectionId?: string;
}

export interface FormState {
  // Template
  templateUsed?: string;

  // Step 1: Basic Info
  projectName: string;
  websiteTitle: string;
  tagline?: string;
  industry?: string;
  targetAudience?: string;
  description?: string;
  submitterName?: string;
  submitterEmail?: string;

  // Step 2: Branding
  primaryLogoUrl?: string;
  alternateLogoUrl?: string;
  faviconUrl?: string;
  brandGuidelinesUrl?: string;

  // Step 3: Color Scheme
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundLight?: string;
  backgroundDark?: string;
  textPrimary?: string;
  textSecondary?: string;
  presetTheme?: string;

  // Step 4: Sections
  sections: SectionData[];

  // Step 5: Navigation
  menuItems?: any;
  footerContent?: any;

  // Step 6: Contact & SEO
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  socialLinks?: any;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImageUrl?: string;

  // Step 7: Inspiration & Media
  inspirations: InspirationData[];
  mediaAssets: MediaAssetData[];

  // Form state
  currentStep: number;
  isSubmitting: boolean;
  submitError?: string;
}

interface FormActions {
  // Template
  setTemplate: (templateId: string) => void;

  // Basic Info
  setBasicInfo: (data: Partial<FormState>) => void;

  // Branding
  setBranding: (data: Partial<FormState>) => void;

  // Color Scheme
  setColorScheme: (data: Partial<FormState>) => void;

  // Sections
  setSections: (sections: SectionData[]) => void;
  addSection: (section: SectionData) => void;
  removeSection: (index: number) => void;
  updateSection: (index: number, section: Partial<SectionData>) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;

  // Navigation
  setNavigation: (data: Partial<FormState>) => void;

  // Contact & SEO
  setContactAndSeo: (data: Partial<FormState>) => void;

  // Inspiration & Media
  addInspiration: (inspiration: InspirationData) => void;
  removeInspiration: (index: number) => void;
  addMediaAsset: (asset: MediaAssetData) => void;
  removeMediaAsset: (index: number) => void;

  // Form navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // Form submission
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitError: (error?: string) => void;

  // Reset
  resetForm: () => void;
}

const initialState: FormState = {
  projectName: '',
  websiteTitle: '',
  sections: [],
  inspirations: [],
  mediaAssets: [],
  currentStep: 0,
  isSubmitting: false,
};

export const useFormStore = create<FormState & FormActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTemplate: (templateId: string) => {
        set({ templateUsed: templateId });
      },

      setBasicInfo: (data: Partial<FormState>) => {
        set(data);
      },

      setBranding: (data: Partial<FormState>) => {
        set(data);
      },

      setColorScheme: (data: Partial<FormState>) => {
        set(data);
      },

      setSections: (sections: SectionData[]) => {
        set({ sections });
      },

      addSection: (section: SectionData) => {
        const { sections } = get();
        set({ sections: [...sections, section] });
      },

      removeSection: (index: number) => {
        const { sections } = get();
        const newSections = sections.filter((_, i) => i !== index);
        // Re-index remaining sections
        const reindexed = newSections.map((s, i) => ({ ...s, orderIndex: i }));
        set({ sections: reindexed });
      },

      updateSection: (index: number, section: Partial<SectionData>) => {
        const { sections } = get();
        const newSections = sections.map((s, i) =>
          i === index ? { ...s, ...section } : s
        );
        set({ sections: newSections });
      },

      reorderSections: (startIndex: number, endIndex: number) => {
        const { sections } = get();
        const result = Array.from(sections);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        // Re-index all sections
        const reindexed = result.map((s, i) => ({ ...s, orderIndex: i }));
        set({ sections: reindexed });
      },

      setNavigation: (data: Partial<FormState>) => {
        set(data);
      },

      setContactAndSeo: (data: Partial<FormState>) => {
        set(data);
      },

      addInspiration: (inspiration: InspirationData) => {
        const { inspirations } = get();
        set({ inspirations: [...inspirations, inspiration] });
      },

      removeInspiration: (index: number) => {
        const { inspirations } = get();
        set({ inspirations: inspirations.filter((_, i) => i !== index) });
      },

      addMediaAsset: (asset: MediaAssetData) => {
        const { mediaAssets } = get();
        set({ mediaAssets: [...mediaAssets, asset] });
      },

      removeMediaAsset: (index: number) => {
        const { mediaAssets } = get();
        set({ mediaAssets: mediaAssets.filter((_, i) => i !== index) });
      },

      nextStep: () => {
        const { currentStep } = get();
        set({ currentStep: Math.min(currentStep + 1, 7) });
      },

      prevStep: () => {
        const { currentStep } = get();
        set({ currentStep: Math.max(currentStep - 1, 0) });
      },

      goToStep: (step: number) => {
        set({ currentStep: Math.max(0, Math.min(step, 7)) });
      },

      setSubmitting: (isSubmitting: boolean) => {
        set({ isSubmitting });
      },

      setSubmitError: (error?: string) => {
        set({ submitError: error });
      },

      resetForm: () => {
        set(initialState);
      },
    }),
    {
      name: 'thinker-form-storage',
      partialize: (state) => {
        // Don't persist submission state
        const { isSubmitting, submitError, ...rest } = state as any;
        return rest;
      },
    }
  )
);
