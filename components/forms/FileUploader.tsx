'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/constants';
import { formatFileSize } from '@/lib/utils';

interface FileUploaderProps {
  onUpload: (url: string) => void;
  currentFile?: string;
  label?: string;
  accept?: string[];
  folder?: string;
}

export function FileUploader({
  onUpload,
  currentFile,
  label = 'Upload File',
  accept = ALLOWED_IMAGE_TYPES as unknown as string[],
  folder = 'thinker-requests',
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentFile || null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setError(null);
      setUploading(true);

      try {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(
            `File size exceeds ${formatFileSize(MAX_FILE_SIZE)}`
          );
        }

        // Create preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }

        // Upload to API
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json();
        onUpload(data.data.url);
        setPreview(data.data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
        setPreview(null);
      } finally {
        setUploading(false);
      }
    },
    [onUpload, folder]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
  };

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      {!preview && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />

          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop the file here</p>
            ) : (
              <>
                <p className="text-gray-700 font-medium">{label}</p>
                <p className="text-sm text-gray-500">
                  Drag & drop or click to browse
                </p>
              </>
            )}

            <p className="text-xs text-gray-400">
              Max size: {formatFileSize(MAX_FILE_SIZE)}
            </p>
          </div>
        </div>
      )}

      {/* Uploading State */}
      {uploading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Uploading...</p>
        </div>
      )}

      {/* Preview */}
      {preview && !uploading && (
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {preview.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded border flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {preview.split('/').pop()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Uploaded successfully</p>
              <Button
                onClick={handleRemove}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}
