'use client';

import { templates } from '@/data/templates';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TemplateSelectionPage() {
  const router = useRouter();

  const handleTemplateSelect = (templateId: string) => {
    // Save selected template to localStorage
    localStorage.setItem('selectedTemplate', templateId);
    localStorage.setItem('formData', JSON.stringify({ templateUsed: templateId }));

    // Navigate to form
    router.push('/request/form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-blue-600 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a template that best fits your project, or start with a blank canvas
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Preview Image Placeholder */}
              <div
                className="h-48 bg-gradient-to-br flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${template.colorScheme.primaryColor}, ${template.colorScheme.secondaryColor})`,
                }}
              >
                <div className="text-white text-center p-6">
                  <div className="text-4xl mb-2">
                    {template.id === 'corporate' && '🏢'}
                    {template.id === 'portfolio' && '🎨'}
                    {template.id === 'restaurant' && '🍽️'}
                    {template.id === 'ecommerce' && '🛍️'}
                    {template.id === 'agency' && '🚀'}
                    {template.id === 'saas' && '💻'}
                    {template.id === 'blank' && '📄'}
                  </div>
                  <p className="text-sm opacity-90">
                    {template.sections.length} sections
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>

                {/* Color Preview */}
                <div className="flex gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: template.colorScheme.primaryColor }}
                    title="Primary Color"
                  />
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: template.colorScheme.secondaryColor }}
                    title="Secondary Color"
                  />
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: template.colorScheme.accentColor }}
                    title="Accent Color"
                  />
                </div>

                {/* Sections List */}
                {template.sections.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Included sections:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.slice(0, 3).map((section, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {section.title}
                        </span>
                      ))}
                      {template.sections.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{template.sections.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateSelect(template.id);
                  }}
                >
                  Select Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Don't worry, you can customize everything including sections, colors, and content in the next steps.
          </p>
        </div>
      </div>
    </div>
  );
}
