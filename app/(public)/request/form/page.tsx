'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import BasicInfoStep from '@/components/forms/steps/BasicInfoStep';
import BrandingStep from '@/components/forms/steps/BrandingStep';
import ColorSchemeStep from '@/components/forms/steps/ColorSchemeStep';
import SectionsStep from '@/components/forms/steps/SectionsStep';
import ContactSeoStep from '@/components/forms/steps/ContactSeoStep';
import ReviewStep from '@/components/forms/steps/ReviewStep';

const STEPS = [
  { id: 0, name: 'Basic Info', component: BasicInfoStep },
  { id: 1, name: 'Branding', component: BrandingStep },
  { id: 2, name: 'Colors', component: ColorSchemeStep },
  { id: 3, name: 'Sections', component: SectionsStep },
  { id: 4, name: 'Contact & SEO', component: ContactSeoStep },
  { id: 5, name: 'Review & Submit', component: ReviewStep },
];

export default function RequestFormPage() {
  const router = useRouter();
  const { currentStep, goToStep, nextStep, prevStep, projectName, resetForm } = useFormStore();

  // Redirect if no project started
  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
      router.push('/');
    }
  };

  const CurrentStepComponent = STEPS[currentStep]?.component || BasicInfoStep;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              {projectName || 'New Website Request'}
            </h1>
            <Button variant="ghost" onClick={handleExit}>
              Save & Exit
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              {STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => goToStep(idx)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      idx === currentStep
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : idx < currentStep
                        ? 'border-blue-600 bg-blue-100 text-blue-600'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        idx < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className="text-xs text-gray-600 text-center"
                  style={{ width: `${100 / STEPS.length}%` }}
                >
                  {step.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <CurrentStepComponent />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              ← Previous
            </Button>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {STEPS.length}
            </div>
            <Button
              onClick={nextStep}
              disabled={currentStep === STEPS.length - 1}
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
