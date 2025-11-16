'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormProgress } from '@/hooks/useFormProgress';
import { getTemplateById } from '@/data/templates';
import { Button } from '@/components/ui/button';

// Form step imports (to be created)
// import { BasicInfoStep } from '@/components/forms/BasicInfoStep';
// import { BrandingStep } from '@/components/forms/BrandingStep';
// import { ColorSchemeStep } from '@/components/forms/ColorSchemeStep';
// import { SectionsStep } from '@/components/forms/SectionsStep';
// import { NavigationStep } from '@/components/forms/NavigationStep';
// import { ContactStep } from '@/components/forms/ContactStep';
// import { ReviewStep } from '@/components/forms/ReviewStep';

interface FormStep {
  id: number;
  name: string;
  title: string;
  description: string;
}

const steps: FormStep[] = [
  {
    id: 1,
    name: 'basic',
    title: 'Basic Information',
    description: 'Tell us about your project',
  },
  {
    id: 2,
    name: 'branding',
    title: 'Branding & Assets',
    description: 'Upload your logo and brand assets',
  },
  {
    id: 3,
    name: 'colors',
    title: 'Color Scheme',
    description: 'Choose your colors',
  },
  {
    id: 4,
    name: 'sections',
    title: 'Page Sections',
    description: 'Customize your page sections',
  },
  {
    id: 5,
    name: 'navigation',
    title: 'Navigation & Footer',
    description: 'Set up your menu and footer',
  },
  {
    id: 6,
    name: 'contact',
    title: 'Contact & SEO',
    description: 'Business info and SEO settings',
  },
  {
    id: 7,
    name: 'review',
    title: 'Review & Submit',
    description: 'Review your request and submit',
  },
];

const initialFormData = {
  templateUsed: '',
  projectData: {
    projectName: '',
    websiteTitle: '',
    tagline: '',
    industry: '',
    targetAudience: '',
    description: '',
    submitterName: '',
    submitterEmail: '',
  },
  branding: {
    primaryLogoUrl: '',
    alternateLogoUrl: '',
    faviconUrl: '',
    brandGuidelinesUrl: '',
  },
  colorScheme: {
    primaryColor: '',
    secondaryColor: '',
    accentColor: '',
    backgroundLight: '',
    backgroundDark: '',
    textPrimary: '',
    textSecondary: '',
    presetTheme: '',
  },
  sections: [],
  navigation: {
    menuItems: [],
    footerContent: {},
  },
  businessInfo: {
    email: '',
    phone: '',
    address: '',
    hours: '',
    socialLinks: {},
  },
  seoMetadata: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImageUrl: '',
  },
  inspirations: [],
  mediaAssets: [],
};

export default function RequestFormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const { formData, updateField, updateFields, isLoaded } = useFormProgress(
    initialFormData
  );

  // Load selected template on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const templateId = localStorage.getItem('selectedTemplate');
      if (!templateId) {
        router.push('/request');
        return;
      }
      setSelectedTemplate(templateId);

      const template = getTemplateById(templateId);
      if (template) {
        // Initialize sections from template
        const templateSections = template.sections.map((s) => ({
          orderIndex: s.orderIndex,
          sectionType: s.sectionType,
          title: s.title,
          subtitle: '',
          content: {},
          layout: 'default',
          backgroundStyle: 'white',
          isVisible: true,
        }));

        // Initialize color scheme from template
        updateFields({
          templateUsed: templateId,
          sections: templateSections,
          colorScheme: {
            ...formData.colorScheme,
            primaryColor: template.colorScheme.primaryColor,
            secondaryColor: template.colorScheme.secondaryColor,
            accentColor: template.colorScheme.accentColor,
          },
        });
      }
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep - 1];
  const template = selectedTemplate ? getTemplateById(selectedTemplate) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                New Website Request
              </h1>
              {template && (
                <p className="text-sm text-gray-600">Template: {template.name}</p>
              )}
            </div>
            <button
              onClick={() => router.push('/request')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Change Template
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col items-center cursor-pointer ${
                    step.id === currentStep
                      ? 'text-blue-600'
                      : step.id < currentStep
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-1 ${
                      step.id === currentStep
                        ? 'bg-blue-600 text-white'
                        : step.id < currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.id < currentStep ? '✓' : step.id}
                  </div>
                  <span className="text-xs font-medium hidden md:block text-center">
                    {step.name}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step.id < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Step Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>

          {/* Step Content - Placeholder for now */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-900 font-medium mb-2">
                Step {currentStep}: {currentStepData.title}
              </p>
              <p className="text-blue-700 text-sm">
                Form components will be implemented next
              </p>
              <div className="mt-4 text-left">
                <p className="text-xs text-gray-600 mb-2">Current form data (auto-saved):</p>
                <pre className="text-xs bg-white p-3 rounded overflow-auto max-h-40">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
            >
              ← Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={handleNext}>Next →</Button>
            ) : (
              <Button onClick={() => router.push('/request/form/success')}>
                Submit Request
              </Button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your progress is automatically saved. You can come back anytime.</p>
        </div>
      </div>
    </div>
  );
}
