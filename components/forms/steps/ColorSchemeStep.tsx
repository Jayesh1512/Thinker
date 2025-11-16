'use client';

import { useFormStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const COLOR_PRESETS = [
  { name: 'Blue Professional', primary: '#1E40AF', secondary: '#64748B', accent: '#0EA5E9' },
  { name: 'Purple Modern', primary: '#7C3AED', secondary: '#DB2777', accent: '#F59E0B' },
  { name: 'Green Natural', primary: '#059669', secondary: '#78350F', accent: '#F59E0B' },
  { name: 'Red Bold', primary: '#DC2626', secondary: '#78350F', accent: '#F59E0B' },
  { name: 'Dark Elegant', primary: '#0F172A', secondary: '#475569', accent: '#F59E0B' },
];

export default function ColorSchemeStep() {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    setColorScheme,
  } = useFormStore();

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setColorScheme({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Color Scheme</h2>
        <p className="text-gray-600">
          Choose your brand colors or select from our presets
        </p>
      </div>

      {/* Color Presets */}
      <div>
        <Label>Quick Presets</Label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="flex items-center gap-3 p-3 border rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex gap-1">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.primary }}
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.secondary }}
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.accent }}
                />
              </div>
              <span className="text-sm font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Custom Colors</h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="primaryColor"
                type="color"
                value={primaryColor || '#3B82F6'}
                onChange={(e) => setColorScheme({ primaryColor: e.target.value })}
                className="w-16 h-10"
              />
              <Input
                type="text"
                value={primaryColor || '#3B82F6'}
                onChange={(e) => setColorScheme({ primaryColor: e.target.value })}
                placeholder="#3B82F6"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="secondaryColor"
                type="color"
                value={secondaryColor || '#64748B'}
                onChange={(e) => setColorScheme({ secondaryColor: e.target.value })}
                className="w-16 h-10"
              />
              <Input
                type="text"
                value={secondaryColor || '#64748B'}
                onChange={(e) => setColorScheme({ secondaryColor: e.target.value })}
                placeholder="#64748B"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="accentColor"
                type="color"
                value={accentColor || '#F59E0B'}
                onChange={(e) => setColorScheme({ accentColor: e.target.value })}
                className="w-16 h-10"
              />
              <Input
                type="text"
                value={accentColor || '#F59E0B'}
                onChange={(e) => setColorScheme({ accentColor: e.target.value })}
                placeholder="#F59E0B"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 p-6 border rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Preview</h4>
          <div className="flex gap-3">
            <div
              className="flex-1 h-24 rounded-lg flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: primaryColor || '#3B82F6' }}
            >
              Primary
            </div>
            <div
              className="flex-1 h-24 rounded-lg flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: secondaryColor || '#64748B' }}
            >
              Secondary
            </div>
            <div
              className="flex-1 h-24 rounded-lg flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: accentColor || '#F59E0B' }}
            >
              Accent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
