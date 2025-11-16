# Thinker - Setup Guide

This guide will help you set up the Thinker project locally and deploy it to production.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** (package manager)
- **Git**
- A **Supabase** account (for PostgreSQL database)
- A **Cloudinary** account (for file storage)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Jayesh1512/Thinker.git
cd Thinker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# File Storage - Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin Authentication
ADMIN_PASSWORD="your-secure-password"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Setup Supabase (PostgreSQL Database)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project:
   - Choose a project name
   - Set a database password (remember this!)
   - Select a region close to you
3. Wait ~2 minutes for project to initialize
4. Get your connection string:
   - Go to **Project Settings** → **Database**
   - Find "Connection string" section
   - Select **Connection pooling** mode
   - Copy the connection string (it looks like: `postgresql://postgres.xxx:xxx@...`)
   - Replace `[password]` with your database password
5. Paste this into your `.env.local` as `DATABASE_URL`

**Important:** We're ONLY using Supabase for PostgreSQL database hosting. You don't need to set up Auth, Storage, or any other Supabase features.

### 5. Setup Cloudinary (File Storage)

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. Go to your **Dashboard**
3. Copy the following credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Paste these into your `.env.local`

### 6. Generate Prisma Client

```bash
npm run prisma:generate
```

### 7. Run Database Migrations

```bash
npm run prisma:migrate
```

When prompted for a migration name, you can use: `init`

### 8. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

---

## 🗄️ Database Management

### View Database in Prisma Studio

Prisma Studio provides a GUI to view and edit your database:

```bash
npm run prisma:studio
```

This will open a browser window at [http://localhost:5555](http://localhost:5555)

### Create a New Migration

After changing your Prisma schema:

```bash
npm run prisma:migrate
```

### Reset Database (⚠️ Deletes all data)

```bash
npx prisma migrate reset
```

---

## 📁 Project Structure

```
thinker/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes (backend)
│   ├── (public)/          # Public pages (no auth)
│   ├── admin/             # Admin pages (protected)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── forms/            # Form components
│   ├── admin/            # Admin components
│   └── common/           # Shared components
│
├── lib/                  # Utility functions
│   ├── prisma.ts         # Prisma client
│   ├── cloudinary.ts     # Cloudinary config
│   ├── utils.ts          # Helper functions
│   └── constants.ts      # App constants
│
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Migration files
│
├── types/                # TypeScript types
├── hooks/                # Custom React hooks
├── data/                 # Static data
└── public/               # Static assets
```

---

## 🔐 Admin Access

The admin dashboard is protected by a simple password authentication (bearer token).

**Default Admin URL:** [http://localhost:3000/admin](http://localhost:3000/admin)

To access the admin dashboard, you'll need to implement the authentication check. The password is set in your `.env.local` as `ADMIN_PASSWORD`.

**Note:** This is a simple MVP authentication. For production, consider upgrading to NextAuth.js or a similar solution.

---

## 🧪 Testing

### Run Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Import your repository:**
   - Click "Add New" → "Project"
   - Select your Thinker repository
   - Click "Import"

4. **Configure Environment Variables:**
   - Add all variables from your `.env.local`
   - Make sure to update `NEXT_PUBLIC_APP_URL` to your production URL

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

6. **Run Migrations on Production Database:**
   ```bash
   # After deployment, run migrations against production DB
   DATABASE_URL="your-production-db-url" npx prisma migrate deploy
   ```

### Deploy to Other Platforms

The app can also be deployed to:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS** (requires more configuration)

---

## 🛠️ Development Workflow

### Adding a New Component

```bash
# Create new component in components/
# Import and use in your pages
```

### Adding a New API Route

```bash
# Create new route.ts in app/api/
# Implement GET, POST, PATCH, DELETE handlers
```

### Modifying Database Schema

1. Edit `prisma/schema.prisma`
2. Run `npm run prisma:migrate`
3. Name your migration descriptively
4. Run `npm run prisma:generate` to update Prisma Client

---

## 📚 Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio GUI |

---

## 🐛 Troubleshooting

### "Error connecting to database"

- Check your `DATABASE_URL` in `.env.local`
- Ensure your Supabase project is active
- Verify your database password is correct
- Make sure you're using the **Connection Pooling** URL

### "Cloudinary upload failed"

- Verify your Cloudinary credentials in `.env.local`
- Check that your API key and secret are correct
- Ensure you haven't exceeded free tier limits

### "Cannot find module '@prisma/client'"

Run:
```bash
npm run prisma:generate
```

### "Port 3000 already in use"

Either:
- Kill the process using port 3000
- Or run on a different port:
  ```bash
  PORT=3001 npm run dev
  ```

### Migration Errors

If you encounter migration issues:
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Or manually delete migrations and re-run
rm -rf prisma/migrations
npm run prisma:migrate
```

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs) (PostgreSQL only)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 🤝 Getting Help

If you encounter issues:

1. Check this setup guide
2. Review the [BUILDING_PLAN.md](./BUILDING_PLAN.md) for architecture details
3. Check the [CLAUDE.md](./CLAUDE.md) for development guidelines
4. Search existing GitHub issues
5. Open a new issue with detailed description

---

## ✅ Verification Checklist

Before starting development, ensure:

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created and filled with valid credentials
- [ ] Supabase PostgreSQL database created
- [ ] Cloudinary account set up
- [ ] Prisma Client generated (`npm run prisma:generate`)
- [ ] Database migrations run (`npm run prisma:migrate`)
- [ ] Development server starts successfully (`npm run dev`)
- [ ] Can access homepage at `http://localhost:3000`

---

**You're all set! Happy coding! 🚀**

For questions or issues, refer to the [README.md](./README.md) and [BUILDING_PLAN.md](./BUILDING_PLAN.md).
