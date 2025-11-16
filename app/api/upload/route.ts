import { NextRequest } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { ALLOWED_IMAGE_TYPES, ALLOWED_DOCUMENT_TYPES, MAX_FILE_SIZE } from '@/lib/constants';

/**
 * POST /api/upload
 *
 * Upload a file to Cloudinary
 *
 * Accepts multipart/form-data with:
 * - file: File to upload
 * - folder (optional): Cloudinary folder name
 */
export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'thinker-requests';

    // Validate file exists
    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];
    if (!allowedTypes.includes(file.type as any)) {
      return Response.json(
        {
          error: 'Invalid file type',
          allowedTypes: allowedTypes,
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, folder);

    // Return success response
    return Response.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('Upload error:', error);

    return Response.json(
      {
        error: 'File upload failed',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
