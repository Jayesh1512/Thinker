/**
 * Preset color schemes for website templates
 */

export interface ColorPreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundLight: string;
    backgroundDark: string;
    textPrimary: string;
    textSecondary: string;
  };
}

export const colorPresets: ColorPreset[] = [
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    description: 'Classic corporate blue palette',
    colors: {
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      backgroundLight: '#f8fafc',
      backgroundDark: '#0f172a',
      textPrimary: '#1e293b',
      textSecondary: '#64748b',
    },
  },
  {
    id: 'modern-purple',
    name: 'Modern Purple',
    description: 'Tech and creative industries',
    colors: {
      primaryColor: '#7c3aed',
      secondaryColor: '#a78bfa',
      accentColor: '#c4b5fd',
      backgroundLight: '#faf5ff',
      backgroundDark: '#1e1b4b',
      textPrimary: '#1e1b4b',
      textSecondary: '#6b7280',
    },
  },
  {
    id: 'vibrant-red',
    name: 'Vibrant Red',
    description: 'Bold and energetic',
    colors: {
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      accentColor: '#f87171',
      backgroundLight: '#fef2f2',
      backgroundDark: '#450a0a',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
  },
  {
    id: 'fresh-green',
    name: 'Fresh Green',
    description: 'Natural and eco-friendly',
    colors: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      accentColor: '#34d399',
      backgroundLight: '#f0fdf4',
      backgroundDark: '#064e3b',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
  },
  {
    id: 'ocean-teal',
    name: 'Ocean Teal',
    description: 'Calm and trustworthy',
    colors: {
      primaryColor: '#0891b2',
      secondaryColor: '#06b6d4',
      accentColor: '#22d3ee',
      backgroundLight: '#f0fdfa',
      backgroundDark: '#164e63',
      textPrimary: '#1f2937',
      textSecondary: '#64748b',
    },
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'Friendly and inviting',
    colors: {
      primaryColor: '#ea580c',
      secondaryColor: '#f97316',
      accentColor: '#fb923c',
      backgroundLight: '#fff7ed',
      backgroundDark: '#431407',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
  },
  {
    id: 'elegant-gray',
    name: 'Elegant Gray',
    description: 'Minimal and sophisticated',
    colors: {
      primaryColor: '#374151',
      secondaryColor: '#4b5563',
      accentColor: '#6b7280',
      backgroundLight: '#f9fafb',
      backgroundDark: '#111827',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
    },
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    description: 'Warm and creative',
    colors: {
      primaryColor: '#ec4899',
      secondaryColor: '#f59e0b',
      accentColor: '#fbbf24',
      backgroundLight: '#fffbeb',
      backgroundDark: '#831843',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    },
  },
];

/**
 * Get preset by ID
 */
export function getColorPresetById(id: string): ColorPreset | undefined {
  return colorPresets.find((preset) => preset.id === id);
}
