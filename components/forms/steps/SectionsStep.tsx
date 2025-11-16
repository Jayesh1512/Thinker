'use client';

import { useFormStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionType } from '@prisma/client';
import { X, GripVertical, Plus } from 'lucide-react';

const SECTION_TYPES: { value: SectionType; label: string }[] = [
  { value: 'HERO', label: 'Hero' },
  { value: 'ABOUT', label: 'About' },
  { value: 'SERVICES', label: 'Services' },
  { value: 'FEATURES', label: 'Features' },
  { value: 'TEAM', label: 'Team' },
  { value: 'TESTIMONIALS', label: 'Testimonials' },
  { value: 'GALLERY', label: 'Gallery' },
  { value: 'CONTACT', label: 'Contact' },
  { value: 'CTA', label: 'Call to Action' },
  { value: 'CUSTOM', label: 'Custom' },
];

export default function SectionsStep() {
  const { sections, addSection, removeSection, updateSection, reorderSections } = useFormStore();

  const handleAddSection = () => {
    addSection({
      orderIndex: sections.length,
      sectionType: 'CUSTOM',
      title: 'New Section',
      isVisible: true,
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      reorderSections(index, index - 1);
    } else if (direction === 'down' && index < sections.length - 1) {
      reorderSections(index, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Sections</h2>
        <p className="text-gray-600">
          Configure the sections that will appear on your website
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <CardTitle className="text-lg">
                    {section.sectionType} - {section.title || 'Untitled'}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Section Type</Label>
                  <select
                    value={section.sectionType}
                    onChange={(e) =>
                      updateSection(index, {
                        sectionType: e.target.value as SectionType,
                      })
                    }
                    className="w-full h-10 px-3 border rounded-md"
                  >
                    {SECTION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={section.title || ''}
                    onChange={(e) =>
                      updateSection(index, { title: e.target.value })
                    }
                    placeholder="Section title"
                  />
                </div>
              </div>
              <div>
                <Label>Subtitle (Optional)</Label>
                <Input
                  value={section.subtitle || ''}
                  onChange={(e) =>
                    updateSection(index, { subtitle: e.target.value })
                  }
                  placeholder="Section subtitle"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleAddSection} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Section
      </Button>

      {sections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No sections yet. Click "Add Section" to get started.
        </div>
      )}
    </div>
  );
}
