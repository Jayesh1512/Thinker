import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BasicInfoStepProps {
  formData: {
    projectData: {
      projectName: string;
      websiteTitle: string;
      tagline?: string;
      industry?: string;
      targetAudience?: string;
      description?: string;
      submitterName?: string;
      submitterEmail?: string;
    };
  };
  onUpdate: (field: string, value: any) => void;
}

export function BasicInfoStep({ formData, onUpdate }: BasicInfoStepProps) {
  const { projectData } = formData;

  const handleChange = (field: keyof typeof projectData, value: string) => {
    onUpdate('projectData', {
      ...projectData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Project Name */}
      <div>
        <Label htmlFor="projectName">
          Project Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="projectName"
          value={projectData.projectName}
          onChange={(e) => handleChange('projectName', e.target.value)}
          placeholder="e.g., My Company Website"
          required
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          Internal name for this project
        </p>
      </div>

      {/* Website Title */}
      <div>
        <Label htmlFor="websiteTitle">
          Website Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="websiteTitle"
          value={projectData.websiteTitle}
          onChange={(e) => handleChange('websiteTitle', e.target.value)}
          placeholder="e.g., Welcome to My Company"
          required
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          This will appear as the main heading on your website
        </p>
      </div>

      {/* Tagline */}
      <div>
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          value={projectData.tagline || ''}
          onChange={(e) => handleChange('tagline', e.target.value)}
          placeholder="e.g., Building the future, one pixel at a time"
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          A short, catchy phrase that describes your business
        </p>
      </div>

      {/* Industry */}
      <div>
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          value={projectData.industry || ''}
          onChange={(e) => handleChange('industry', e.target.value)}
          placeholder="e.g., Technology, Healthcare, E-commerce"
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          What industry or sector does your business operate in?
        </p>
      </div>

      {/* Target Audience */}
      <div>
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Input
          id="targetAudience"
          value={projectData.targetAudience || ''}
          onChange={(e) => handleChange('targetAudience', e.target.value)}
          placeholder="e.g., Small business owners, Young professionals"
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          Who is your primary target audience?
        </p>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          value={projectData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your project, business, or what you want to achieve with this website..."
          rows={5}
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide more details about your project and goals
        </p>
      </div>

      {/* Divider */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Contact Information (Optional)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Provide your contact details if you'd like to receive updates about your
          request.
        </p>
      </div>

      {/* Submitter Name */}
      <div>
        <Label htmlFor="submitterName">Your Name</Label>
        <Input
          id="submitterName"
          value={projectData.submitterName || ''}
          onChange={(e) => handleChange('submitterName', e.target.value)}
          placeholder="John Doe"
          className="mt-1.5"
        />
      </div>

      {/* Submitter Email */}
      <div>
        <Label htmlFor="submitterEmail">Your Email</Label>
        <Input
          id="submitterEmail"
          type="email"
          value={projectData.submitterEmail || ''}
          onChange={(e) => handleChange('submitterEmail', e.target.value)}
          placeholder="john@example.com"
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1">
          We'll send you a confirmation with your tracking ID
        </p>
      </div>
    </div>
  );
}
