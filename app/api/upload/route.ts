import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { ALLOWED_IMAGE_TYPES, ALLOWED_DOCUMENT_TYPES, MAX_FILE_SIZE } from '@/lib/constants';

/**
 * POST /api/upload
 * Upload a file to Cloudinary
 * Validates file type and size
 */
export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'thinker-requests';

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided',
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];
    if (!allowedTypes.includes(file.type as any)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type. Allowed types: JPEG, PNG, SVG, WebP, PDF',
          allowedTypes,
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
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: result.url,
        publicId: result.publicId,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload file',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/upload
 * Returns upload endpoint information
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'File upload endpoint',
    info: {
      method: 'POST',
      contentType: 'multipart/form-data',
      maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
      allowedImageTypes: ALLOWED_IMAGE_TYPES,
      allowedDocumentTypes: ALLOWED_DOCUMENT_TYPES,
      fields: {
        file: 'Required - The file to upload',
        folder: 'Optional - Cloudinary folder (default: thinker-requests)',
      },
    },
  });
}
