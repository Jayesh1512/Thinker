'use client';

import { useFormStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactSeoStep() {
  const {
    email,
    phone,
    address,
    hours,
    metaTitle,
    metaDescription,
    keywords,
    setContactAndSeo,
  } = useFormStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact & SEO</h2>
        <p className="text-gray-600">
          Business contact information and search engine optimization
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Contact Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Business Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="contact@example.com"
              value={email || ''}
              onChange={(e) => setContactAndSeo({ email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone || ''}
              onChange={(e) => setContactAndSeo({ phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Business Address</Label>
          <Input
            id="address"
            placeholder="123 Main St, City, State 12345"
            value={address || ''}
            onChange={(e) => setContactAndSeo({ address: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="hours">Business Hours</Label>
          <Input
            id="hours"
            placeholder="Mon-Fri: 9AM-5PM, Sat-Sun: Closed"
            value={hours || ''}
            onChange={(e) => setContactAndSeo({ hours: e.target.value })}
          />
        </div>
      </div>

      {/* SEO Metadata */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-gray-900">SEO Metadata</h3>
        <p className="text-sm text-gray-600">
          Optimize your website for search engines
        </p>

        <div>
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            placeholder="Your Business Name - What You Do"
            value={metaTitle || ''}
            onChange={(e) => setContactAndSeo({ metaTitle: e.target.value })}
            maxLength={60}
          />
          <p className="text-xs text-gray-500 mt-1">
            {metaTitle?.length || 0}/60 characters (recommended)
          </p>
        </div>

        <div>
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            placeholder="A brief description of your business and services..."
            value={metaDescription || ''}
            onChange={(e) => setContactAndSeo({ metaDescription: e.target.value })}
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-gray-500 mt-1">
            {metaDescription?.length || 0}/160 characters (recommended)
          </p>
        </div>

        <div>
          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
          <Input
            id="keywords"
            placeholder="business, services, professional, consulting"
            value={keywords || ''}
            onChange={(e) => setContactAndSeo({ keywords: e.target.value })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Relevant keywords for your business
          </p>
        </div>
      </div>
    </div>
  );
}
