# Thinker - Building Plan

**Version:** 1.0.0
**Last Updated:** 2025-11-16
**Status:** Technical Planning Phase

---

## 📋 Table of Contents

1. [Technology Stack](#technology-stack)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [Frontend Structure](#frontend-structure)
5. [Backend Structure](#backend-structure)
6. [Implementation Phases](#implementation-phases)
7. [Development Timeline](#development-timeline)
8. [Security Considerations](#security-considerations)
9. [Deployment Strategy](#deployment-strategy)
10. [Testing Strategy](#testing-strategy)

---

## 🛠️ Technology Stack

### Frontend

**Core Framework:**
- **Next.js 14+** (React framework with API routes)
  - Server-side rendering
  - Built-in API routes (no separate backend needed)
  - File-based routing
  - Optimized performance

**Styling:**
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible components
- **Lucide Icons** - Modern icon library

**Form Management:**
- **React Hook Form** - Performant form state management
- **Zod** - TypeScript-first schema validation

**UI Components:**
- **Shadcn/ui** - Re-usable component library
- **React Dropzone** - File upload handling
- **React Color** - Color picker component
- **TanStack Table** - Admin dashboard table
- **React Beautiful DnD** - Drag-and-drop for sections

**State Management:**
- **Zustand** (optional) - Lightweight state management for form progress

### Backend

**API:**
- **Next.js API Routes** - Serverless API endpoints

**Database:**
- **PostgreSQL** - Relational database
  - Structured data with JSON support
  - ACID compliance
  - Excellent for complex queries

**ORM:**
- **Prisma** - Type-safe database client
  - Auto-generated types
  - Migration system
  - Easy schema management

**File Storage:**
- **Cloudinary** (Recommended for MVP)
  - Free tier: 25GB storage, 25GB bandwidth
  - Image optimization
  - Easy integration

  Alternative: **AWS S3** (for production scale)

**Email (Optional for v1):**
- **Resend** or **SendGrid** - Email API for tracking ID notifications

### Development Tools

- **TypeScript** - Type safety across the stack
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **pnpm/npm** - Package manager

### Deployment

- **Vercel** (Recommended)
  - Zero-config Next.js deployment
  - Serverless functions
  - Global CDN
  - Free tier available

  Alternative: **Netlify**, **Railway**, or **DigitalOcean**

### Database Hosting

- **Supabase** (Recommended for MVP) - **PostgreSQL ONLY**
  - ✅ PostgreSQL database hosting (this is what we use)
  - ✅ Free tier: 500MB database
  - ✅ Connection pooling
  - ✅ Auto-backups
  - ❌ NOT using: Supabase Auth (using custom simple auth)
  - ❌ NOT using: Supabase Storage (using Cloudinary)
  - ❌ NOT using: Supabase REST API (using Next.js API routes)
  - ❌ NOT using: Supabase Realtime (not needed for MVP)

  **We're only using Supabase as a PostgreSQL database provider!**

  Alternative: **Neon**, **Railway**, **PlanetScale** (all PostgreSQL providers)

---

## 📦 Services & What We're Using

This section clarifies exactly what we're using from each service:

### Supabase
**Purpose:** PostgreSQL database hosting ONLY
- ✅ Database hosting
- ✅ Connection string to connect via Prisma
- ❌ NOT using any other Supabase features (auth, storage, realtime, etc.)

### Cloudinary
**Purpose:** File storage for logos, images, and media
- ✅ Image uploads
- ✅ Image optimization
- ✅ CDN delivery
- All user-uploaded files go here

### Vercel
**Purpose:** Application hosting
- ✅ Next.js deployment
- ✅ Serverless API routes
- ✅ Frontend hosting
- ✅ Edge network

### Prisma
**Purpose:** Database ORM
- ✅ Type-safe database queries
- ✅ Schema management
- ✅ Migrations
- Connects to Supabase PostgreSQL database

**Architecture Summary:**
```
Next.js App (Vercel)
    ↓
Prisma ORM
    ↓
PostgreSQL Database (Supabase)

User Files → Cloudinary → URLs stored in PostgreSQL
```

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                        │
│  ┌───────────────────────────────────────────────────┐ │
│  │          Next.js Frontend (React)                 │ │
│  │  - Template Selection Page                        │ │
│  │  - Multi-Step Form                                │ │
│  │  - Admin Dashboard                                │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js API Routes (Backend)               │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │   /api/     │  │   /api/      │  │   /api/       │ │
│  │  requests   │  │   upload     │  │   admin       │ │
│  └─────────────┘  └──────────────┘  └───────────────┘ │
└──────┬──────────────────────┬────────────────┬─────────┘
       │                      │                │
       ▼                      ▼                ▼
┌─────────────┐      ┌─────────────┐    ┌──────────────┐
│ PostgreSQL  │      │ Cloudinary  │    │ Email Service│
│  Database   │      │ File Storage│    │  (Optional)  │
│ (Supabase)  │      │   (Images)  │    │   (Resend)   │
│   + Prisma  │      │             │    │              │
└─────────────┘      └─────────────┘    └──────────────┘

Note: Supabase is ONLY used for PostgreSQL database hosting.
      All other features (auth, storage, realtime) are NOT used.
```

### Data Flow

**Request Submission Flow:**
```
User fills form → Frontend validation → API POST /api/requests
→ Prisma saves to PostgreSQL → Upload files to Cloudinary
→ Generate tracking ID → Return tracking ID to user
→ (Optional) Send email notification
```

**Admin Dashboard Flow:**
```
Admin opens dashboard → API GET /api/admin/requests
→ Prisma fetches from PostgreSQL → Display in table
→ Admin clicks request → API GET /api/admin/requests/:id
→ Display full details → Admin updates status
→ API PATCH /api/admin/requests/:id → Update database
```

---

## 🗄️ Database Design

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Enums
enum RequestStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}

enum SectionType {
  HERO
  ABOUT
  SERVICES
  FEATURES
  TEAM
  TESTIMONIALS
  GALLERY
  CONTACT
  CTA
  CUSTOM
}

// Main Request Model
model Request {
  id            String         @id @default(cuid())
  trackingId    String         @unique
  status        RequestStatus  @default(PENDING)
  priority      Priority       @default(MEDIUM)
  templateUsed  String?        // corporate, portfolio, restaurant, etc.

  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  completedAt   DateTime?

  adminNotes    String?        @db.Text

  // Relations
  projectData   ProjectData?
  branding      Branding?
  colorScheme   ColorScheme?
  sections      Section[]
  navigation    Navigation?
  businessInfo  BusinessInfo?
  seoMetadata   SeoMetadata?
  inspirations  Inspiration[]
  mediaAssets   MediaAsset[]

  @@index([status])
  @@index([createdAt])
  @@index([trackingId])
}

// Project Basic Data
model ProjectData {
  id              String   @id @default(cuid())
  requestId       String   @unique
  request         Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  projectName     String
  websiteTitle    String
  tagline         String?
  industry        String?
  targetAudience  String?
  description     String?  @db.Text

  submitterName   String?
  submitterEmail  String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Branding Assets
model Branding {
  id                String   @id @default(cuid())
  requestId         String   @unique
  request           Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  primaryLogoUrl    String?
  alternateLogoUrl  String?
  faviconUrl        String?
  brandGuidelinesUrl String?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

// Color Scheme
model ColorScheme {
  id                String   @id @default(cuid())
  requestId         String   @unique
  request           Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  primaryColor      String?
  secondaryColor    String?
  accentColor       String?
  backgroundLight   String?
  backgroundDark    String?
  textPrimary       String?
  textSecondary     String?
  presetTheme       String?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

// Sections
model Section {
  id              String      @id @default(cuid())
  requestId       String
  request         Request     @relation(fields: [requestId], references: [id], onDelete: Cascade)

  orderIndex      Int
  sectionType     SectionType
  title           String?
  subtitle        String?
  content         Json?       // Flexible JSON for section content
  layout          String?
  backgroundStyle String?
  isVisible       Boolean     @default(true)

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([requestId, orderIndex])
}

// Navigation
model Navigation {
  id            String   @id @default(cuid())
  requestId     String   @unique
  request       Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  menuItems     Json?    // Array of menu items
  footerContent Json?    // Footer data

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Business Information
model BusinessInfo {
  id            String   @id @default(cuid())
  requestId     String   @unique
  request       Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  email         String?
  phone         String?
  address       String?
  hours         String?
  socialLinks   Json?    // Object with social media links

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// SEO Metadata
model SeoMetadata {
  id              String   @id @default(cuid())
  requestId       String   @unique
  request         Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  metaTitle       String?
  metaDescription String?  @db.Text
  keywords        String?
  ogImageUrl      String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Inspiration Websites
model Inspiration {
  id            String   @id @default(cuid())
  requestId     String
  request       Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  websiteUrl    String
  notes         String?  @db.Text
  screenshotUrl String?

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([requestId])
}

// Media Assets
model MediaAsset {
  id          String   @id @default(cuid())
  requestId   String
  request     Request  @relation(fields: [requestId], references: [id], onDelete: Cascade)

  assetType   String   // logo, image, video, document
  fileUrl     String
  fileName    String?
  fileSize    Int?
  mimeType    String?
  altText     String?
  description String?
  sectionId   String?  // Optional link to specific section

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([requestId])
}
```

### Database Relationships

```
Request (1) ──── (1) ProjectData
        │
        ├──── (1) Branding
        │
        ├──── (1) ColorScheme
        │
        ├──── (Many) Sections
        │
        ├──── (1) Navigation
        │
        ├──── (1) BusinessInfo
        │
        ├──── (1) SeoMetadata
        │
        ├──── (Many) Inspirations
        │
        └──── (Many) MediaAssets
```

---

## 🎨 Frontend Structure

### Directory Structure

```
thinker/
├── app/                        # Next.js 14 app directory
│   ├── (public)/              # Public routes (no auth)
│   │   ├── page.tsx           # Home/Landing page
│   │   ├── request/           # Request form pages
│   │   │   ├── page.tsx       # Template selection
│   │   │   ├── form/          # Multi-step form
│   │   │   │   ├── page.tsx   # Form container
│   │   │   │   └── [step]/    # Dynamic step routing
│   │   │   └── success/       # Submission success
│   │   └── track/             # Status tracking (optional)
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── admin/                 # Admin routes (protected)
│   │   ├── page.tsx           # Dashboard/Queue
│   │   ├── requests/
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Request detail
│   │   └── layout.tsx         # Admin layout
│   │
│   ├── api/                   # API routes
│   │   ├── requests/
│   │   │   ├── route.ts       # POST new request
│   │   │   └── [id]/
│   │   │       └── route.ts   # GET request by tracking ID
│   │   ├── admin/
│   │   │   ├── requests/
│   │   │   │   ├── route.ts   # GET all requests (list)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts # GET/PATCH/DELETE request
│   │   │   └── auth/
│   │   │       └── route.ts   # Admin authentication check
│   │   └── upload/
│   │       └── route.ts       # File upload endpoint
│   │
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   └── providers.tsx          # Context providers
│
├── components/                # React components
│   ├── ui/                    # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── forms/                 # Form-specific components
│   │   ├── TemplateSelector.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── FormStep.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── FileUploader.tsx
│   │   ├── SectionEditor.tsx
│   │   └── FormReview.tsx
│   │
│   ├── admin/                 # Admin components
│   │   ├── RequestQueue.tsx
│   │   ├── RequestDetail.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── PrioritySelector.tsx
│   │   └── StatsCard.tsx
│   │
│   └── common/                # Shared components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Loading.tsx
│       └── ErrorBoundary.tsx
│
├── lib/                       # Utility functions
│   ├── prisma.ts              # Prisma client instance
│   ├── cloudinary.ts          # Cloudinary config
│   ├── validation.ts          # Zod schemas
│   ├── utils.ts               # Helper functions
│   └── constants.ts           # App constants
│
├── types/                     # TypeScript types
│   ├── request.ts             # Request types
│   ├── template.ts            # Template types
│   └── index.ts               # Exported types
│
├── hooks/                     # Custom React hooks
│   ├── useFormProgress.ts
│   ├── useFileUpload.ts
│   └── useDebounce.ts
│
├── data/                      # Static data
│   ├── templates.ts           # Template definitions
│   ├── industries.ts          # Industry list
│   └── colors.ts              # Preset color schemes
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Migration files
│   └── seed.ts                # Seed data (optional)
│
├── public/                    # Static assets
│   ├── images/
│   └── icons/
│
├── .env.local                 # Environment variables
├── .env.example               # Example env file
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── BUILDING_PLAN.md
└── CLAUDE.md
```

### Key Frontend Components

#### 1. Template Selector Component
```typescript
// components/forms/TemplateSelector.tsx
interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  previewImage: string;
  sections: SectionType[];
  colorScheme: ColorScheme;
}

export function TemplateSelector({ onSelect }) {
  // Displays template cards
  // Handles template selection
  // Navigates to form
}
```

#### 2. Multi-Step Form Container
```typescript
// app/(public)/request/form/page.tsx
const steps = [
  { id: 1, name: 'Basic Info', component: BasicInfoStep },
  { id: 2, name: 'Branding', component: BrandingStep },
  { id: 3, name: 'Sections', component: SectionsStep },
  { id: 4, name: 'Navigation', component: NavigationStep },
  { id: 5, name: 'Contact & SEO', component: ContactStep },
  { id: 6, name: 'Inspiration', component: InspirationStep },
  { id: 7, name: 'Review', component: ReviewStep },
];

export default function RequestFormPage() {
  // Manages form state
  // Handles step navigation
  // Auto-saves to localStorage
  // Submits final data
}
```

#### 3. Section Editor Component
```typescript
// components/forms/SectionEditor.tsx
export function SectionEditor({ sections, onChange }) {
  // Drag-and-drop reordering
  // Add new section
  // Edit section content
  // Remove section
  // Rich content editing
}
```

#### 4. Admin Request Queue Component
```typescript
// components/admin/RequestQueue.tsx
export function RequestQueue() {
  // Fetches all requests
  // Filters and sorting
  // Pagination
  // Status badges
  // Click to view details
}
```

---

## ⚙️ Backend Structure

### API Routes

#### 1. POST /api/requests
```typescript
// app/api/requests/route.ts
import { prisma } from '@/lib/prisma';
import { requestSchema } from '@/lib/validation';

export async function POST(req: Request) {
  // 1. Parse and validate request body
  const body = await req.json();
  const validated = requestSchema.parse(body);

  // 2. Generate unique tracking ID
  const trackingId = generateTrackingId();

  // 3. Save to database with all relations
  const request = await prisma.request.create({
    data: {
      trackingId,
      templateUsed: validated.template,
      projectData: {
        create: validated.projectData
      },
      branding: {
        create: validated.branding
      },
      sections: {
        create: validated.sections
      },
      // ... other relations
    }
  });

  // 4. (Optional) Send email notification
  // await sendTrackingEmail(validated.email, trackingId);

  // 5. Return tracking ID
  return Response.json({ trackingId });
}
```

#### 2. GET /api/admin/requests
```typescript
// app/api/admin/requests/route.ts
export async function GET(req: Request) {
  // 1. Check admin authentication
  const isAuthorized = await checkAdminAuth(req);
  if (!isAuthorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Parse query parameters (filters, sorting)
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const sortBy = searchParams.get('sortBy') || 'createdAt';

  // 3. Fetch requests
  const requests = await prisma.request.findMany({
    where: status ? { status } : undefined,
    include: {
      projectData: true,
    },
    orderBy: { [sortBy]: 'desc' }
  });

  // 4. Return data
  return Response.json({ requests });
}
```

#### 3. PATCH /api/admin/requests/[id]
```typescript
// app/api/admin/requests/[id]/route.ts
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 1. Check admin auth
  const isAuthorized = await checkAdminAuth(req);
  if (!isAuthorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Parse body
  const body = await req.json();
  const { status, priority, adminNotes } = body;

  // 3. Update request
  const request = await prisma.request.update({
    where: { id: params.id },
    data: {
      status,
      priority,
      adminNotes,
      completedAt: status === 'COMPLETED' ? new Date() : null
    }
  });

  // 4. Return updated request
  return Response.json({ request });
}
```

#### 4. POST /api/upload
```typescript
// app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: Request) {
  // 1. Parse form data
  const formData = await req.formData();
  const file = formData.get('file') as File;

  // 2. Validate file type and size
  const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: 'Invalid file type' }, { status: 400 });
  }

  if (file.size > maxSize) {
    return Response.json({ error: 'File too large' }, { status: 400 });
  }

  // 3. Upload to Cloudinary
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'thinker-requests' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  // 4. Return URL
  return Response.json({ url: result.secure_url });
}
```

### Utility Functions

#### Tracking ID Generator
```typescript
// lib/utils.ts
export function generateTrackingId(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TKR-${year}-${random}`;
}
```

#### Admin Authentication
```typescript
// lib/auth.ts
export async function checkAdminAuth(req: Request): Promise<boolean> {
  // Simple password check for MVP
  const authHeader = req.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!authHeader || !adminPassword) return false;

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Bearer') return false;

  return credentials === adminPassword;
}
```

---

## 🚀 Implementation Phases

### ~~Phase 1: Project Setup (Week 1)~~ ✅ COMPLETED

~~**Tasks:**~~
~~1. Initialize Next.js project with TypeScript~~
~~2. Setup Tailwind CSS and Shadcn/ui~~
~~3. Setup Supabase account and create PostgreSQL database~~
~~4. Configure Prisma with Supabase PostgreSQL connection string~~
~~5. Setup Cloudinary account for file storage~~
~~6. Create directory structure~~
~~7. Setup environment variables (.env.local)~~
~~8. Initialize Git repository~~

~~**Supabase Setup (PostgreSQL Only):**~~
```bash
# 1. Go to supabase.com and create free account
# 2. Create new project (choose name, password, region)
# 3. Wait for project to be ready (~2 minutes)
# 4. Go to Project Settings → Database
# 5. Copy "Connection string" under "Connection pooling"
# 6. Paste into .env.local as DATABASE_URL
# 7. Done! Ignore all other Supabase features
```

~~**Deliverables:**~~
~~- Running Next.js app~~
~~- PostgreSQL database connection established (via Supabase)~~
~~- Cloudinary configured for file uploads~~
~~- Development environment ready~~

---

### ~~Phase 2: Database & Backend (Week 1-2)~~ ✅ COMPLETED

~~**Tasks:**~~
~~1. Write Prisma schema~~
~~2. Create and run migrations~~
~~3. Test database operations~~
~~4. Create API routes:~~
   ~~- POST /api/requests~~
   ~~- GET /api/admin/requests~~
   ~~- GET /api/admin/requests/[id]~~
   ~~- PATCH /api/admin/requests/[id]~~
   ~~- DELETE /api/admin/requests/[id]~~
   ~~- POST /api/upload~~
   ~~- GET /api/admin/stats~~
~~5. Implement validation with Zod~~
~~6. Test API endpoints with Postman/Insomnia~~

~~**Deliverables:**~~
~~- Complete database schema~~
~~- Working API endpoints~~
~~- File upload functionality~~

---

### ~~Phase 3: Frontend - Public Form (Week 2-4)~~ ✅ COMPLETED

~~**Tasks:**~~
~~1. Create landing page~~
~~2. Build template selector~~
~~3. Implement multi-step form:~~
   ~~- Step navigation~~
   ~~- Form state management~~
   ~~- LocalStorage auto-save~~
~~4. Create form step components:~~
   ~~- Basic Info~~
   ~~- Branding (with file upload)~~
   ~~- Color Scheme (with color picker)~~
   ~~- Sections (with reordering)~~
   ~~- Contact & SEO~~
   ~~- Review & Submit~~
~~5. Implement form validation~~
~~6. Create success page with tracking ID~~
~~7. Mobile responsive design~~
~~8. Loading states and error handling~~

~~**Deliverables:**~~
~~- Complete public-facing form~~
~~- Template selection working~~
~~- Form submission to database~~
~~- Tracking ID generation~~

---

### Phase 4: Frontend - Admin Dashboard (Week 4-5)

**Tasks:**
1. Create admin layout
2. Build request queue table:
   - Filter by status
   - Sort by date/priority
   - Search functionality
   - Pagination
3. Create request detail view:
   - Display all data in organized tabs
   - Status/priority updates
   - Admin notes
4. Implement admin authentication
5. Create statistics dashboard
6. Mobile responsive admin panel

**Deliverables:**
- Working admin dashboard
- Request management functionality
- Status tracking system

---

### Phase 5: Testing & Refinement (Week 5-6)

**Tasks:**
1. End-to-end testing:
   - Submit test requests
   - Verify data integrity
   - Test file uploads
   - Test admin operations
2. Cross-browser testing
3. Mobile device testing
4. Performance optimization:
   - Image optimization
   - Code splitting
   - Lazy loading
5. Accessibility audit
6. Bug fixes

**Deliverables:**
- Tested, stable application
- Performance optimizations
- Bug-free experience

---

### Phase 6: Deployment (Week 6)

**Tasks:**
1. Setup production database (Supabase/Neon)
2. Configure Cloudinary production account
3. Setup environment variables in Vercel
4. Deploy to Vercel
5. Test production environment
6. Setup domain (if applicable)
7. Monitor for errors

**Deliverables:**
- Live production application
- Deployed and accessible
- Monitoring in place

---

## 📅 Development Timeline

### 6-Week Timeline

| Week | Focus | Key Deliverables | Status |
|------|-------|------------------|--------|
| 1 | Setup & Backend | Project initialized, DB schema, API routes | ✅ Complete |
| 2 | Backend & Start Frontend | API complete, Template selector, Form start | ✅ Complete |
| 3 | Public Form | Multi-step form complete, All form steps | ✅ Complete |
| 4 | Public Form & Admin Start | Form submission working, Admin layout | 🔄 In Progress |
| 5 | Admin Dashboard | Request queue, Detail view, Status management | ⏳ Pending |
| 6 | Testing & Deployment | Testing complete, Live production app | ⏳ Pending |

### Milestones

✅ **Milestone 1 (End Week 2):** Backend API fully functional
⏳ **Milestone 2 (End Week 4):** Public form complete and working
⏳ **Milestone 3 (End Week 5):** Admin dashboard complete
⏳ **Milestone 4 (End Week 6):** Application deployed and live

---

## 🔒 Security Considerations

### Input Validation
- Use Zod schemas for all API inputs
- Sanitize user input before storage
- Validate file uploads (type, size, content)
- Prevent SQL injection (Prisma handles this)
- XSS prevention (React handles this by default)

### File Upload Security
```typescript
// File upload validation
const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
  document: ['application/pdf']
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function validateFile(file: File, type: 'image' | 'document') {
  if (!ALLOWED_FILE_TYPES[type].includes(file.type)) {
    throw new Error('Invalid file type');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }
  return true;
}
```

### Admin Authentication
```typescript
// Simple bearer token auth for MVP
// Environment variable: ADMIN_PASSWORD

// Upgrade to JWT or NextAuth in future versions
```

### Environment Variables
```bash
# .env.local

# Database - Supabase PostgreSQL connection string
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# File Storage - Cloudinary credentials
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin Authentication - Simple password (custom, not Supabase Auth)
ADMIN_PASSWORD="secure-random-password"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (optional)
RESEND_API_KEY="..."

# NOTE: We're only using Supabase for PostgreSQL database
# No Supabase Auth keys needed
# No Supabase Storage keys needed
```

### CORS & CSP
```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_APP_URL },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PATCH,DELETE' },
        ],
      },
    ];
  },
};
```

---

## 🌐 Deployment Strategy

### Recommended: Vercel + Supabase (PostgreSQL Only)

**Why Vercel:**
- Zero-config Next.js deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Preview deployments for branches
- Free tier: Unlimited sites

**Why Supabase (for PostgreSQL):**
- PostgreSQL database hosting
- Free tier: 500MB database
- Auto-backups
- Connection pooling
- Database dashboard for management
- **Note:** We're ONLY using the PostgreSQL database, not auth/storage/realtime

### Deployment Steps

1. **Setup Supabase PostgreSQL Database:**
   ```bash
   # 1. Create account at supabase.com
   # 2. Create new project
   # 3. Go to Project Settings → Database
   # 4. Copy "Connection string" (use Connection Pooling mode)
   # 5. Format: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
   # 6. Add to environment variables as DATABASE_URL

   # That's it! We're only using the PostgreSQL database
   # Ignore all other Supabase features (Auth, Storage, etc.)
   ```

2. **Setup Cloudinary:**
   ```bash
   # Create account on cloudinary.com
   # Get API credentials
   # Add to environment variables
   ```

3. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Deploy
   vercel --prod
   ```

4. **Environment Variables in Vercel:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add all variables from .env.local

5. **Run Database Migrations:**
   ```bash
   # After deployment, run migrations
   npx prisma migrate deploy
   ```

### Alternative: Railway

**One-click deployment:**
- Railway provides both database and hosting
- PostgreSQL included
- Environment variables in dashboard
- Similar pricing to Vercel + Supabase

---

## 🧪 Testing Strategy

### Unit Tests
```typescript
// __tests__/lib/utils.test.ts
import { generateTrackingId } from '@/lib/utils';

describe('generateTrackingId', () => {
  it('generates unique tracking IDs', () => {
    const id1 = generateTrackingId();
    const id2 = generateTrackingId();
    expect(id1).not.toBe(id2);
  });

  it('follows TKR-YYYY-XXXXXX format', () => {
    const id = generateTrackingId();
    expect(id).toMatch(/^TKR-\d{4}-[A-Z0-9]{6}$/);
  });
});
```

### Integration Tests
```typescript
// __tests__/api/requests.test.ts
import { POST } from '@/app/api/requests/route';

describe('POST /api/requests', () => {
  it('creates a new request', async () => {
    const mockRequest = {
      template: 'corporate',
      projectData: { projectName: 'Test' },
      // ... other data
    };

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.trackingId).toBeDefined();
  });
});
```

### E2E Tests (Optional)
```typescript
// Playwright or Cypress
test('user can submit a request', async ({ page }) => {
  await page.goto('/request');

  // Select template
  await page.click('[data-template="corporate"]');

  // Fill form steps
  await page.fill('[name="projectName"]', 'Test Project');
  await page.click('[data-action="next"]');

  // ... continue through steps

  // Submit
  await page.click('[data-action="submit"]');

  // Check success
  await expect(page.locator('[data-tracking-id]')).toBeVisible();
});
```

### Manual Testing Checklist

**Public Form:**
- [ ] Template selection works
- [ ] All form steps load
- [ ] Form validation works
- [ ] File uploads successful
- [ ] Color picker works
- [ ] Section drag-and-drop works
- [ ] Form submission successful
- [ ] Tracking ID displayed
- [ ] Data saved correctly in database

**Admin Dashboard:**
- [ ] Login works
- [ ] Request queue displays
- [ ] Filters work correctly
- [ ] Sorting works
- [ ] Request detail view loads
- [ ] Status updates work
- [ ] Priority updates work
- [ ] Admin notes save

**Cross-Browser:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Mobile:**
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet views

---

## 📊 Performance Optimization

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/template-preview.jpg"
  alt="Template preview"
  width={400}
  height={300}
  loading="lazy"
/>
```

### Code Splitting
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(
  () => import('@/components/admin/RequestQueue'),
  { loading: () => <Loading /> }
);
```

### Database Query Optimization
```typescript
// Use select to fetch only needed fields
const requests = await prisma.request.findMany({
  select: {
    id: true,
    trackingId: true,
    status: true,
    createdAt: true,
    projectData: {
      select: {
        projectName: true
      }
    }
  }
});
```

---

## 🔄 Future Enhancements (v2.0+)

1. **Rich Text Editor**
   - TipTap or Slate.js
   - Markdown support

2. **AI Content Suggestions**
   - OpenAI API integration
   - Auto-generate section content

3. **Real-time Collaboration**
   - WebSockets
   - Multiple users editing

4. **Email Notifications**
   - Status updates
   - Request received confirmation

5. **Advanced Admin Features**
   - Bulk operations
   - Request templates
   - Client communication

6. **Analytics Dashboard**
   - Request statistics
   - Popular templates
   - Completion metrics

7. **Export Options**
   - PDF specification sheet
   - JSON export
   - Figma integration

8. **Website Preview**
   - Real-time preview as user fills form
   - Template renderer

9. **Multi-language Support**
   - i18n implementation
   - Multiple language forms

10. **API for External Integration**
    - Webhook notifications
    - Third-party integrations

---

## 📝 Notes & Considerations

### Scalability
- Current architecture supports 100s of requests easily
- For 1000s+ requests, consider:
  - Database indexing optimization
  - CDN for static assets
  - Caching layer (Redis)
  - Background job processing

### Cost Estimation (Monthly)

**Free Tier (MVP):**
- Vercel: Free
- Supabase: Free (500MB DB)
- Cloudinary: Free (25GB storage/bandwidth)
- **Total: $0/month**

**Paid Tier (Scale):**
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Cloudinary: $89/month (Advanced plan)
- **Total: ~$134/month**

### Maintenance
- Weekly database backups
- Monthly dependency updates
- Security patch monitoring
- User feedback review

---

## 🎯 Success Criteria

**Technical:**
- ✅ Application loads in < 2 seconds
- ✅ Form submission successful 99%+ of the time
- ✅ Mobile responsive on all devices
- ✅ WCAG 2.1 AA compliant
- ✅ No critical security vulnerabilities

**User Experience:**
- ✅ Intuitive form flow
- ✅ Clear instructions
- ✅ Fast file uploads
- ✅ Visual feedback for all actions

**Admin Experience:**
- ✅ Easy request management
- ✅ Quick filtering and sorting
- ✅ Complete data visibility

---

## 📞 Development Support

For questions during development:
1. Check this building plan
2. Review Next.js documentation
3. Check Prisma documentation
4. Consult component library docs

---

## 🎯 Quick Reference: Service Usage

**Important clarification on what we're using:**

| Service | What We Use | What We DON'T Use |
|---------|-------------|-------------------|
| **Supabase** | ✅ PostgreSQL database only | ❌ Auth, Storage, Realtime, Edge Functions |
| **Cloudinary** | ✅ File storage & optimization | - |
| **Vercel** | ✅ Next.js hosting & deployment | - |
| **Prisma** | ✅ Database ORM | - |
| **Next.js** | ✅ Full framework (frontend + API) | - |

**Connection Flow:**
```
Your Code (Next.js)
    ↓
Prisma ORM
    ↓
PostgreSQL Database (hosted on Supabase)

User Files → Cloudinary (separate from Supabase)
```

**Environment Variables You Need:**
1. `DATABASE_URL` - Supabase PostgreSQL connection string
2. `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
3. `CLOUDINARY_API_KEY` - From Cloudinary dashboard
4. `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
5. `ADMIN_PASSWORD` - Custom password you create

**No Supabase API keys needed** because we're only using the PostgreSQL database via standard PostgreSQL connection string!

---

**Ready to build! 🚀**

Follow this plan step-by-step to create a robust, scalable website request system.
