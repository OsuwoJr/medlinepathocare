# Medline Pathocare - Diagnostic Laboratory Website

A modern, accessible Next.js website with backend for Medline Pathocare, a leading referral laboratory providing diagnostic services in Nairobi, Kenya. Includes a **client portal** for viewing test results and an **admin dashboard** for managing clients and uploading reports.

## 🏥 About

Medline Pathocare is a diagnostic laboratory founded in 2025 by Sir. Granton Trevar, specializing in comprehensive diagnostic services from routine testing to complex and esoteric testing. The laboratory is accredited and certified by KMLTTB, serving a network of over 20 clinical partners across Nairobi.

## ✨ Features

### Core Features
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Complete dark mode support with smooth transitions
- **Accessibility**:
  - High contrast mode for better readability
  - Font size controls (Normal, Large, Extra Large)
  - Keyboard navigation support
  - ARIA labels for screen readers
- **Test Catalog**: Comprehensive, searchable catalog of 55+ diagnostic tests with pricing
- **Modern UI/UX**: Clean, professional design matching medical/scientific aesthetic

### Backend & Auth
- **Authentication**: NextAuth.js with Supabase Auth (credentials provider)
- **Roles**: Admin (staff) and User (clients); admin emails configured via `ADMIN_EMAILS`
- **Client Portal**: Authenticated clients can view their own test results; results are scoped by session (no client_id from request)
- **Admin Dashboard**: Protected area for staff to manage clients, upload test results, and view reports
- **API Rate Limiting**: In-memory rate limiter on public API routes (auth/admin/portal excluded)
- **Middleware**: Protects `/portal` (requires sign-in) and `/admin` (requires admin role)

### Pages & Sections
- **Home Page**: Hero section, mission & vision, history, services overview, quality & compliance, contact
- **About Page**: Detailed information about the laboratory
- **Services Page**: Overview with links to test catalog, consultative services, specialized expertise
- **Test Catalog**: Searchable list of all available diagnostic tests (API: `/api/test-catalog`)
- **Contact Page**: Contact information and support details
- **Blog Page**: News and updates section (ready for content)
- **Auth**: `/auth/signin`, `/auth/signup` (client sign-in/signup)
- **Admin**: `/admin/signin`, `/admin` (dashboard), `/admin/clients`, `/admin/clients/[id]`, `/admin/upload`, `/admin/reports`
- **Portal**: `/portal` — clients view their test results
- **Providers**: Referral form, specimen guides, supply ordering
- **Legal**: Privacy, Terms, Accessibility

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Inter (Google Fonts)
- **Auth**: [NextAuth.js v5](https://authjs.dev/) (Credentials + Supabase Auth)
- **Database & Storage**: [Supabase](https://supabase.com/) (PostgreSQL, Storage, RLS)
- **Validation**: [Zod](https://zod.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Git
- A [Supabase](https://supabase.com/) project (for auth, database, and storage)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd patho
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables**: Create `.env.local` in the project root with the required variables (see [Environment Variables](#-environment-variables) below).

4. **Database**: Run the Supabase schema and storage policies (see [Database Setup](#-database-setup) below).

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**: Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🔐 Environment Variables

Create a `.env.local` file in the project root. Required and optional variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-only; never expose to client) |
| `NEXTAUTH_SECRET` | Yes | Secret for NextAuth.js session encryption (e.g. `openssl rand -base64 32`) |
| `ADMIN_EMAILS` | No | Comma-separated list of admin emails; if unset, any authenticated user can access admin |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL (default: `https://medlinepathocare.vercel.app`) |
| `NEXT_PUBLIC_PHONE_NUMBER` | No | Contact phone (default: +254796168900) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Contact email |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | WhatsApp number for booking/contact |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | No | Formspree endpoint for booking form |
| `NEXT_PUBLIC_FORMSPREE_CONSULTATION_ENDPOINT` | No | Formspree endpoint for consultation form |
| `NEXT_PUBLIC_FORMSPREE_SUPPLY_ORDER_ENDPOINT` | No | Formspree endpoint for supply order form |
| `NEXT_PUBLIC_FORMSPREE_PACKAGES_ENDPOINT` | No | Formspree endpoint for packages/offers interest form (default: https://formspree.io/f/mojnkjyj) |

## 📁 Database Setup

1. In the [Supabase Dashboard](https://app.supabase.com/) → SQL Editor, run the schema and policies in order.

2. **Schema** (`supabase/schema.sql`): Creates `clients` and `test_results` tables with RLS so clients can only read/update their own profile and view their own test results.

3. **Storage**: Create a storage bucket named `test-results` (private). Then run `supabase/storage-policies.sql` so clients can read only files under their own folder (path format: `{client_id}/{filename}`).

4. **Auth**: Use Supabase Auth for sign-up/sign-in; the app uses credentials provider that delegates to Supabase. Ensure Email auth is enabled in Supabase Auth settings.

## 📁 Project Structure

```
patho/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout with theme provider
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global styles and theme variables
│   ├── metadata.ts                   # Site metadata
│   ├── robots.ts                     # Robots.txt
│   ├── sitemap.ts                    # Sitemap
│   ├── about/                        # About page
│   ├── accessibility/                # Accessibility info page
│   ├── admin/                        # Admin area (protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Admin dashboard
│   │   ├── signin/page.tsx           # Admin sign-in
│   │   ├── clients/page.tsx          # Client list
│   │   ├── clients/[id]/page.tsx     # Client detail
│   │   ├── upload/page.tsx           # Upload test results
│   │   └── reports/page.tsx          # Reports list & stats
│   ├── api/                          # API routes
│   │   ├── auth/[...nextauth]/       # NextAuth handlers
│   │   ├── admin/
│   │   │   ├── clients/route.ts      # GET clients (admin)
│   │   │   ├── clients/[id]/route.ts # GET/PATCH client (admin)
│   │   │   ├── reports/route.ts      # GET reports + stats (admin)
│   │   │   ├── reports/[id]/download/route.ts  # Signed download (admin)
│   │   │   └── upload/route.ts       # POST upload result file (admin)
│   │   ├── portal/results/route.ts   # GET current user's results (session-scoped)
│   │   ├── test-catalog/route.ts     # GET test catalog
│   │   └── test-upload/route.ts      # Public test upload (if used)
│   ├── auth/
│   │   ├── signin/page.tsx           # Client sign-in
│   │   └── signup/page.tsx           # Client sign-up
│   ├── blog/
│   ├── contact/
│   ├── portal/page.tsx               # Client portal (view results)
│   ├── privacy/
│   ├── terms/
│   ├── providers/                    # Provider resources
│   │   ├── referral-form/
│   │   ├── specimen-guides/
│   │   └── supply-ordering/
│   ├── services/
│   │   ├── page.tsx
│   │   ├── test-catalog/
│   │   ├── consultative-services/
│   │   └── specialized-expertise/
│   └── test-upload/
├── components/
│   ├── Navigation.tsx
│   ├── TestCard.tsx
│   ├── TestResultCard.tsx            # Portal result card
│   ├── ThemeProvider.tsx
│   ├── AccessibilityControls.tsx
│   ├── ClientPortalBanner.tsx
│   ├── BookingModal.tsx
│   ├── Providers.tsx
│   └── StructuredData.tsx
├── lib/
│   ├── auth.ts                       # NextAuth config (Supabase + admin role)
│   ├── admin.ts                      # requireAdmin helper
│   ├── supabase.ts                   # Browser Supabase client
│   ├── constants.ts
│   └── validation.ts                 # Zod schemas (e.g. booking)
├── data/
│   └── tests.ts                      # Test catalog data (55+ tests)
├── supabase/
│   ├── schema.sql                    # clients, test_results + RLS
│   └── storage-policies.sql          # test-results bucket RLS
├── scripts/
│   └── test-portal-security.mjs      # Security test for portal API
├── types/
│   └── next-auth.d.ts               # NextAuth session type (role)
├── public/                           # Static assets
├── middleware.ts                     # Auth + rate limiting
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔌 API Reference

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/*` | * | NextAuth | Sign-in, sign-out, session |
| `/api/admin/clients` | GET | Admin | List clients (optional `?search=`) |
| `/api/admin/clients/[id]` | GET, PATCH | Admin | Get or update client |
| `/api/admin/reports` | GET | Admin | List reports + stats (total, this month, unique clients) |
| `/api/admin/reports/[id]/download` | GET | Admin | Signed download URL for result file |
| `/api/admin/upload` | POST | Admin | Upload test result (form: file, email, testName, testId?, notes?) |
| `/api/portal/results` | GET | User | Current user's test results (session-scoped; no client_id in request) |
| `/api/test-catalog` | GET | Public | Test catalog list |

Portal results API uses only `session.user.id` as client_id; query/body parameters for client_id are ignored for security.

## 🧪 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint
- `npm run test:portal-security` — Run portal API security tests (dev server must be running, or set `BASE_URL`)

Example:
```bash
# With dev server on localhost:3000
npm run test:portal-security

# Against deployed app
BASE_URL=https://your-app.vercel.app node scripts/test-portal-security.mjs
```

## 🎨 Branding & Colors

### Color Palette
- **Primary (Turquoise Blue)**: `#00bcd4` — Main brand color
- **Accent (Orange)**: `#ff9800` — Taglines and highlights
- **Background Light**: `#fafafa` — Clean white background
- **Background Dark**: `#0a0a0a` — Deep black for dark mode

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Sizes**: Configurable (Normal, Large, Extra Large)

## ♿ Accessibility Features

- **Dark Mode**: Toggle between light and dark themes
- **High Contrast**: Enhanced contrast mode for better readability
- **Font Size**: Three size options (Normal, Large, Extra Large)
- **Keyboard Navigation**: Full keyboard support throughout
- **Focus Indicators**: Clear focus states for all interactive elements
- **ARIA Labels**: Proper labels for screen readers

Accessibility controls are available as a floating button in the bottom-right corner.

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px – 1024px (2 column layout)
- **Desktop**: > 1024px (3 column layout)

## 🔐 SEO & Metadata

- Optimized meta tags for search engines
- Open Graph tags
- Favicon and app icons for all platforms
- Web app manifest for PWA support

## 📞 Contact Information

**Medline Pathocare**  
Location: Roysambu, Nairobi, Kenya  
Accreditation: KMLTTB  

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all required environment variables in Project Settings → Environment Variables
4. Deploy; subsequent pushes to the main branch deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js (e.g. Netlify, AWS Amplify, Railway, DigitalOcean App Platform). Ensure Supabase env vars and `NEXTAUTH_SECRET` are set.

## 📄 License

This project is proprietary and confidential.

## 👥 Credits

- **Founder**: Sir. Granton Trevar
- **Established**: 2025
- **Location**: Roysambu, Nairobi, Kenya

## 🔄 Version History

- **v0.1.0** — Initial release with core features (home, test catalog, dark mode, accessibility)
- **Current** — Backend: NextAuth + Supabase, client portal, admin dashboard, client/report management, upload, rate limiting, RLS, security tests

## 🤝 Contributing

This is a private project. For internal development:

1. Create a feature branch
2. Make your changes
3. Test thoroughly (including `npm run test:portal-security` if touching portal/admin)
4. Submit for review

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [NextAuth.js](https://authjs.dev/)
- [Supabase Documentation](https://supabase.com/docs)

## 🐛 Troubleshooting

### Port already in use
```bash
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
rm -rf node_modules .next
npm install
```

### Build errors
```bash
rm -rf .next
npm run build
```

### Auth or Supabase errors
- Ensure `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXTAUTH_SECRET`
- Run `supabase/schema.sql` and `supabase/storage-policies.sql` in your Supabase project
- Create the `test-results` storage bucket and apply storage policies

## 📧 Support

For technical support or questions about the website, please contact the development team.

---

**Built with ❤️ for Medline Pathocare**
