# Thinker API Documentation

**Version:** 1.0.0
**Base URL:** `http://localhost:3000/api` (development) or `https://your-domain.com/api` (production)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Public Endpoints](#public-endpoints)
3. [Admin Endpoints](#admin-endpoints)
4. [Request Schema](#request-schema)
5. [Response Format](#response-format)
6. [Error Handling](#error-handling)
7. [Examples](#examples)

---

## Authentication

### Admin Authentication

Admin endpoints require Bearer token authentication.

**Header Format:**
```
Authorization: Bearer {ADMIN_PASSWORD}
```

The `ADMIN_PASSWORD` is set in your environment variables.

**Example:**
```bash
curl -H "Authorization: Bearer your-admin-password" \
  http://localhost:3000/api/admin/requests
```

---

## Public Endpoints

### 1. Create Request

**Endpoint:** `POST /api/requests`

**Description:** Submit a new website request

**Authentication:** None required

**Request Body:**
```json
{
  "templateUsed": "corporate",
  "projectData": {
    "projectName": "My Business Website",
    "websiteTitle": "My Business - Professional Services",
    "tagline": "Excellence in Every Detail",
    "industry": "Professional Services",
    "targetAudience": "Business professionals",
    "description": "A modern website for our professional services company",
    "submitterName": "John Doe",
    "submitterEmail": "john@example.com"
  },
  "branding": {
    "primaryLogoUrl": "https://cloudinary.com/logo.png",
    "faviconUrl": "https://cloudinary.com/favicon.ico"
  },
  "colorScheme": {
    "primaryColor": "#1E40AF",
    "secondaryColor": "#64748B",
    "accentColor": "#F59E0B"
  },
  "sections": [
    {
      "orderIndex": 0,
      "sectionType": "HERO",
      "title": "Welcome to Our Company",
      "subtitle": "Professional services you can trust",
      "isVisible": true
    }
  ],
  "businessInfo": {
    "email": "contact@example.com",
    "phone": "+1-555-0123",
    "address": "123 Main St, City, State 12345"
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "trackingId": "TKR-2025-ABC123",
  "requestId": "clx1234567890",
  "message": "Request submitted successfully"
}
```

---

### 2. Get Request by Tracking ID

**Endpoint:** `GET /api/requests/{trackingId}`

**Description:** Check request status using tracking ID

**Authentication:** None required

**Parameters:**
- `trackingId` (path) - The unique tracking ID (e.g., TKR-2025-ABC123)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "trackingId": "TKR-2025-ABC123",
    "status": "PENDING",
    "templateUsed": "corporate",
    "createdAt": "2025-11-16T10:00:00.000Z",
    "updatedAt": "2025-11-16T10:00:00.000Z",
    "completedAt": null,
    "projectData": {
      "projectName": "My Business Website",
      "websiteTitle": "My Business - Professional Services",
      "submitterEmail": "john@example.com"
    }
  }
}
```

---

### 3. Upload File

**Endpoint:** `POST /api/upload`

**Description:** Upload a file to Cloudinary

**Authentication:** None required

**Request:** `multipart/form-data`
- `file` (File, required) - File to upload
- `folder` (string, optional) - Cloudinary folder name (default: "thinker-requests")

**Accepted File Types:**
- Images: JPEG, PNG, SVG, WebP
- Documents: PDF

**Max File Size:** 5MB

**Response:** `200 OK`
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v123/thinker-requests/file.jpg",
  "publicId": "thinker-requests/file",
  "fileName": "logo.png",
  "fileSize": 102400,
  "mimeType": "image/png"
}
```

---

## Admin Endpoints

All admin endpoints require authentication.

### 1. List Requests

**Endpoint:** `GET /api/admin/requests`

**Description:** Get paginated list of all requests with filtering and sorting

**Authentication:** Required

**Query Parameters:**
- `status` (string, optional) - Filter by status: PENDING, IN_PROGRESS, COMPLETED, CANCELLED
- `priority` (string, optional) - Filter by priority: HIGH, MEDIUM, LOW
- `sortBy` (string, optional) - Sort field: createdAt, updatedAt, status, priority (default: createdAt)
- `order` (string, optional) - Sort order: asc, desc (default: desc)
- `search` (string, optional) - Search in tracking ID or project name
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10, max: 100)

**Example:**
```
GET /api/admin/requests?status=PENDING&sortBy=createdAt&order=desc&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "trackingId": "TKR-2025-ABC123",
      "status": "PENDING",
      "priority": "MEDIUM",
      "templateUsed": "corporate",
      "createdAt": "2025-11-16T10:00:00.000Z",
      "updatedAt": "2025-11-16T10:00:00.000Z",
      "completedAt": null,
      "adminNotes": null,
      "projectData": {
        "projectName": "My Business Website",
        "websiteTitle": "My Business - Professional Services",
        "submitterName": "John Doe",
        "submitterEmail": "john@example.com"
      },
      "_count": {
        "sections": 5,
        "mediaAssets": 3,
        "inspirations": 2
      }
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### 2. Get Request Details

**Endpoint:** `GET /api/admin/requests/{id}`

**Description:** Get complete request details with all relations

**Authentication:** Required

**Parameters:**
- `id` (path) - Request ID (not tracking ID)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "trackingId": "TKR-2025-ABC123",
    "status": "PENDING",
    "priority": "MEDIUM",
    "templateUsed": "corporate",
    "createdAt": "2025-11-16T10:00:00.000Z",
    "updatedAt": "2025-11-16T10:00:00.000Z",
    "completedAt": null,
    "adminNotes": null,
    "projectData": { /* full project data */ },
    "branding": { /* branding data */ },
    "colorScheme": { /* color scheme */ },
    "sections": [ /* array of sections */ ],
    "navigation": { /* navigation data */ },
    "businessInfo": { /* business info */ },
    "seoMetadata": { /* SEO data */ },
    "inspirations": [ /* array of inspirations */ ],
    "mediaAssets": [ /* array of media assets */ ]
  }
}
```

---

### 3. Update Request

**Endpoint:** `PATCH /api/admin/requests/{id}`

**Description:** Update request status, priority, or admin notes

**Authentication:** Required

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "adminNotes": "Started working on this project. Logo needs revision."
}
```

**Allowed Fields:**
- `status` - PENDING, IN_PROGRESS, COMPLETED, CANCELLED
- `priority` - HIGH, MEDIUM, LOW
- `adminNotes` - Admin notes (max 10,000 characters)
- `completedAt` - ISO 8601 date string (auto-set when status = COMPLETED)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "trackingId": "TKR-2025-ABC123",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "adminNotes": "Started working on this project. Logo needs revision.",
    "updatedAt": "2025-11-16T11:00:00.000Z"
  },
  "message": "Request updated successfully"
}
```

---

### 4. Delete Request

**Endpoint:** `DELETE /api/admin/requests/{id}`

**Description:** Permanently delete a request and all related data

**Authentication:** Required

**Parameters:**
- `id` (path) - Request ID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Request deleted successfully"
}
```

---

### 5. Get Statistics

**Endpoint:** `GET /api/admin/stats`

**Description:** Get dashboard statistics

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "total": 150,
    "byStatus": {
      "pending": 42,
      "inProgress": 18,
      "completed": 85,
      "cancelled": 5
    },
    "byPriority": {
      "high": 15,
      "medium": 95,
      "low": 40
    },
    "recentRequests": 23,
    "templateUsage": [
      {
        "templateUsed": "corporate",
        "_count": {
          "templateUsed": 45
        }
      },
      {
        "templateUsed": "portfolio",
        "_count": {
          "templateUsed": 38
        }
      }
    ]
  }
}
```

---

## Request Schema

### Complete Request Object

See the Prisma schema in `prisma/schema.prisma` for the complete database schema.

**Main Models:**
- `Request` - Main request with tracking ID, status, priority
- `ProjectData` - Basic project information
- `Branding` - Logo and brand assets
- `ColorScheme` - Color palette
- `Section` - Page sections (reorderable)
- `Navigation` - Menu and footer
- `BusinessInfo` - Contact information
- `SeoMetadata` - SEO settings
- `Inspiration` - Reference websites
- `MediaAsset` - Uploaded files

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "error": "Error message",
  "details": "Additional error details or validation errors"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

---

## Error Handling

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid authentication)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

### Validation Errors

Validation errors return a 400 status with detailed error information:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "inclusive": true,
      "message": "Project name is required",
      "path": ["projectData", "projectName"]
    }
  ]
}
```

---

## Examples

### Example 1: Submit a Simple Request

```bash
curl -X POST http://localhost:3000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "templateUsed": "portfolio",
    "projectData": {
      "projectName": "John Doe Portfolio",
      "websiteTitle": "John Doe - Web Developer",
      "submitterEmail": "john@example.com"
    }
  }'
```

### Example 2: Upload a Logo

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/logo.png" \
  -F "folder=thinker-requests"
```

### Example 3: Get Admin Request List

```bash
curl -X GET "http://localhost:3000/api/admin/requests?status=PENDING&page=1&limit=20" \
  -H "Authorization: Bearer your-admin-password"
```

### Example 4: Update Request Status

```bash
curl -X PATCH http://localhost:3000/api/admin/requests/clx1234567890 \
  -H "Authorization: Bearer your-admin-password" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED",
    "adminNotes": "Website delivered successfully"
  }'
```

### Example 5: Get Dashboard Statistics

```bash
curl -X GET http://localhost:3000/api/admin/stats \
  -H "Authorization: Bearer your-admin-password"
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production, consider adding rate limiting middleware.

---

## CORS

CORS is configured in `next.config.js` to allow requests from the configured `NEXT_PUBLIC_APP_URL`.

For development, all origins are allowed for `/api/*` endpoints.

---

## Changelog

### Version 1.0.0 (2025-11-16)
- Initial API release
- Public request submission
- File upload to Cloudinary
- Admin authentication
- Full CRUD operations for requests
- Dashboard statistics

---

## Support

For issues or questions:
1. Check this documentation
2. Review the [SETUP.md](./SETUP.md) guide
3. Check the [BUILDING_PLAN.md](./BUILDING_PLAN.md)
4. Open an issue on GitHub

---

**Happy building! 🚀**
