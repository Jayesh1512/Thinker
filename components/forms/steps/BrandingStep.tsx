'use client';

import { useState } from 'react';
import { useFormStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function BrandingStep() {
  const { primaryLogoUrl, alternateLogoUrl, faviconUrl, setBranding } = useFormStore();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (
    file: File,
    field: 'primaryLogoUrl' | 'alternateLogoUrl' | 'faviconUrl'
  ) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setBranding({ [field]: data.url });
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Branding & Assets</h2>
        <p className="text-gray-600">
          Upload your logo and brand assets (or provide URLs if already uploaded)
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="primaryLogo">Primary Logo</Label>
          <div className="mt-2 space-y-2">
            <Input
              id="primaryLogo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'primaryLogoUrl');
              }}
              disabled={uploading}
            />
            <Input
              placeholder="Or paste logo URL here"
              value={primaryLogoUrl || ''}
              onChange={(e) => setBranding({ primaryLogoUrl: e.target.value })}
            />
            {primaryLogoUrl && (
              <div className="mt-2">
                <img
                  src={primaryLogoUrl}
                  alt="Primary Logo"
                  className="max-w-xs h-auto border rounded p-2"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="alternateLogo">Alternate Logo (Optional)</Label>
          <div className="mt-2 space-y-2">
            <Input
              id="alternateLogo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'alternateLogoUrl');
              }}
              disabled={uploading}
            />
            <Input
              placeholder="Or paste alternate logo URL"
              value={alternateLogoUrl || ''}
              onChange={(e) => setBranding({ alternateLogoUrl: e.target.value })}
            />
            {alternateLogoUrl && (
              <div className="mt-2">
                <img
                  src={alternateLogoUrl}
                  alt="Alternate Logo"
                  className="max-w-xs h-auto border rounded p-2"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="favicon">Favicon (Optional)</Label>
          <div className="mt-2 space-y-2">
            <Input
              id="favicon"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'faviconUrl');
              }}
              disabled={uploading}
            />
            <Input
              placeholder="Or paste favicon URL"
              value={faviconUrl || ''}
              onChange={(e) => setBranding({ faviconUrl: e.target.value })}
            />
            {faviconUrl && (
              <div className="mt-2">
                <img
                  src={faviconUrl}
                  alt="Favicon"
                  className="w-16 h-16 border rounded p-2"
                />
              </div>
            )}
          </div>
        </div>

        {uploading && (
          <div className="text-sm text-blue-600">
            Uploading file...
          </div>
        )}
      </div>
    </div>
  );
}
