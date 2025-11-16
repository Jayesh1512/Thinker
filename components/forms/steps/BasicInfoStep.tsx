'use client';

import { useFormStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function BasicInfoStep() {
  const {
    projectName,
    websiteTitle,
    tagline,
    industry,
    targetAudience,
    description,
    submitterName,
    submitterEmail,
    setBasicInfo,
  } = useFormStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">
          Tell us about your website project and who it's for
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="projectName">
            Project Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="projectName"
            placeholder="e.g., My Business Website"
            value={projectName}
            onChange={(e) => setBasicInfo({ projectName: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Internal name for your project
          </p>
        </div>

        <div>
          <Label htmlFor="websiteTitle">
            Website Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="websiteTitle"
            placeholder="e.g., Acme Corp - Professional Services"
            value={websiteTitle}
            onChange={(e) => setBasicInfo({ websiteTitle: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            The main title that will appear on your website
          </p>
        </div>

        <div>
          <Label htmlFor="tagline">Tagline (Optional)</Label>
          <Input
            id="tagline"
            placeholder="e.g., Excellence in Every Detail"
            value={tagline || ''}
            onChange={(e) => setBasicInfo({ tagline: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="industry">Industry (Optional)</Label>
            <Input
              id="industry"
              placeholder="e.g., Professional Services"
              value={industry || ''}
              onChange={(e) => setBasicInfo({ industry: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
            <Input
              id="targetAudience"
              placeholder="e.g., Business professionals"
              value={targetAudience || ''}
              onChange={(e) => setBasicInfo({ targetAudience: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Project Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Describe your website project, its goals, and what makes it unique..."
            value={description || ''}
            onChange={(e) => setBasicInfo({ description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="submitterName">Your Name (Optional)</Label>
              <Input
                id="submitterName"
                placeholder="John Doe"
                value={submitterName || ''}
                onChange={(e) => setBasicInfo({ submitterName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="submitterEmail">Your Email (Optional)</Label>
              <Input
                id="submitterEmail"
                type="email"
                placeholder="john@example.com"
                value={submitterEmail || ''}
                onChange={(e) => setBasicInfo({ submitterEmail: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send you a tracking ID
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
