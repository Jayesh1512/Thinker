'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReviewStep() {
  const router = useRouter();
  const formState = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formState.projectName || !formState.websiteTitle) {
        throw new Error('Project name and website title are required');
      }

      // Prepare request payload
      const payload = {
        templateUsed: formState.templateUsed,
        projectData: {
          projectName: formState.projectName,
          websiteTitle: formState.websiteTitle,
          tagline: formState.tagline,
          industry: formState.industry,
          targetAudience: formState.targetAudience,
          description: formState.description,
          submitterName: formState.submitterName,
          submitterEmail: formState.submitterEmail,
        },
        branding: formState.primaryLogoUrl || formState.alternateLogoUrl || formState.faviconUrl
          ? {
              primaryLogoUrl: formState.primaryLogoUrl,
              alternateLogoUrl: formState.alternateLogoUrl,
              faviconUrl: formState.faviconUrl,
            }
          : undefined,
        colorScheme: formState.primaryColor
          ? {
              primaryColor: formState.primaryColor,
              secondaryColor: formState.secondaryColor,
              accentColor: formState.accentColor,
            }
          : undefined,
        sections: formState.sections.length > 0 ? formState.sections : undefined,
        businessInfo: formState.email || formState.phone || formState.address
          ? {
              email: formState.email,
              phone: formState.phone,
              address: formState.address,
              hours: formState.hours,
            }
          : undefined,
        seoMetadata: formState.metaTitle || formState.metaDescription
          ? {
              metaTitle: formState.metaTitle,
              metaDescription: formState.metaDescription,
              keywords: formState.keywords,
            }
          : undefined,
      };

      // Submit to API
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      const data = await response.json();

      // Clear form and redirect to success page
      formState.resetForm();
      router.push(`/request/success?trackingId=${data.trackingId}`);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
        <p className="text-gray-600">
          Review your information before submitting
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-semibold">Project Name:</span>{' '}
              {formState.projectName || <span className="text-red-500">Required</span>}
            </div>
            <div>
              <span className="font-semibold">Website Title:</span>{' '}
              {formState.websiteTitle || <span className="text-red-500">Required</span>}
            </div>
            {formState.tagline && (
              <div>
                <span className="font-semibold">Tagline:</span> {formState.tagline}
              </div>
            )}
            {formState.industry && (
              <div>
                <span className="font-semibold">Industry:</span> {formState.industry}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Branding */}
        {(formState.primaryLogoUrl || formState.alternateLogoUrl || formState.faviconUrl) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {formState.primaryLogoUrl && (
                <div>
                  <span className="font-semibold">Primary Logo:</span> ✓ Uploaded
                </div>
              )}
              {formState.alternateLogoUrl && (
                <div>
                  <span className="font-semibold">Alternate Logo:</span> ✓ Uploaded
                </div>
              )}
              {formState.faviconUrl && (
                <div>
                  <span className="font-semibold">Favicon:</span> ✓ Uploaded
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Colors */}
        {formState.primaryColor && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Color Scheme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                {formState.primaryColor && (
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded border"
                      style={{ backgroundColor: formState.primaryColor }}
                    />
                    <div className="text-xs mt-1">Primary</div>
                  </div>
                )}
                {formState.secondaryColor && (
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded border"
                      style={{ backgroundColor: formState.secondaryColor }}
                    />
                    <div className="text-xs mt-1">Secondary</div>
                  </div>
                )}
                {formState.accentColor && (
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded border"
                      style={{ backgroundColor: formState.accentColor }}
                    />
                    <div className="text-xs mt-1">Accent</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sections */}
        {formState.sections.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Page Sections ({formState.sections.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {formState.sections.map((section, idx) => (
                  <div key={idx} className="text-sm">
                    {idx + 1}. {section.sectionType} - {section.title}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Info */}
        {(formState.email || formState.phone || formState.address) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {formState.email && <div>Email: {formState.email}</div>}
              {formState.phone && <div>Phone: {formState.phone}</div>}
              {formState.address && <div>Address: {formState.address}</div>}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !formState.projectName || !formState.websiteTitle}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
        {(!formState.projectName || !formState.websiteTitle) && (
          <p className="text-sm text-red-600 mt-2 text-center">
            Please complete required fields (Project Name & Website Title)
          </p>
        )}
      </div>
    </div>
  );
}
