'use client';

import { useRouter } from 'next/navigation';
import { templates } from '@/data/templates';
import { useFormStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TemplateSelectionPage() {
  const router = useRouter();
  const { setTemplate, setSections } = useFormStore();

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    // Set template in store
    setTemplate(templateId);

    // Pre-populate sections from template
    const sections = template.defaultSections.map((section) => ({
      ...section,
      isVisible: true,
    }));
    setSections(sections);

    // Navigate to form
    router.push('/request/form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h1>
          <p className="text-lg text-gray-600">
            Select a template to get started, or choose blank to create from scratch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500"
              onClick={() => handleSelectTemplate(template.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{template.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <span className="text-xs text-gray-500">{template.category}</span>
                  </div>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.defaultSections.slice(0, 4).map((section, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {section.sectionType}
                      </span>
                    ))}
                    {template.defaultSections.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{template.defaultSections.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Select Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-600"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
