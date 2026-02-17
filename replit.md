# Overview

This is a candidate recruitment/survey application styled to look like a Mercado Livre (MercadoLibre) hiring portal. It collects candidate information through a multi-step form and routes candidates through different flows based on whether they have a driver's license (CNH). The app is built with a React frontend and Express backend, using PostgreSQL for data storage.

**Important**: The application's visual identity (yellow/blue Mercado Livre branding, logo, layout) must never be altered. All new pages must maintain the institutional branding with the `MLHeader` and `MLFooter` components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Animations**: Framer Motion for page transitions and form animations
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming; Nunito font family
- **Build Tool**: Vite with HMR support

The frontend lives in `client/src/`. Pages are in `client/src/pages/`, reusable UI components in `client/src/components/ui/`. Custom hooks are in `client/src/hooks/`.

Key application flow:
1. `Survey` page (`/`) — Main candidate form collecting personal data
2. `Quiz` (`/quiz/:id`) — 20-question personal/professional assessment with A-D scoring (1-4 pts)
3. `QuizProcessamento` (`/quiz-processamento/:id`) — 13-15s random processing animation
4. `QuizResultado` (`/quiz-resultado/:id`) — Profile result (Iniciante/Desenvolvimento/Avançado/Alta Performance)
5. `VagasAprovadas` (`/vagas-aprovadas/:id`) — Job approval page with 3 open + 2 premium locked jobs
6. For premium job unlock: `AvaliacaoGerencial` (`/avaliacao-gerencial/:id`) — 15-question management assessment → `AvaliacaoProcessando` (`/avaliacao-processando/:id`) — 6s processing with pass/fail (60% threshold)
7. `VagasCheckout` (`/vagas-checkout/:id`) — Checkout with fee breakdown (R$97 + R$147 + R$197 = R$441)
8. `ResultadoAvaliacao` (`/resultado-avaliacao/:id`) — Final evaluation result with R$49.70 breakdown + WhatsApp
9. `Obrigado` (`/obrigado`) — Thank you / confirmation page
10. Legacy CNH flows still available: `EtapaFinalCNH`, `ProgramaHabilitacao`, `Entrevista`, `AnaliseDados`, `EducativoCNH`, `SeguroPedagogico`, `Confirmacao`
11. Supporting pages: `Termos`, `Privacidade`, `FAQ`, `Suporte`

Path aliases configured:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Backend Architecture
- **Framework**: Express 5 running on Node.js with TypeScript (via `tsx`)
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Entry Point**: `server/index.ts` creates HTTP server, registers routes, serves static files
- **Routes**: Defined in `server/routes.ts` — currently `POST /api/candidates` and `PATCH /api/candidates/:id`
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class using Drizzle ORM
- **Dev Mode**: Vite dev server is used as middleware (configured in `server/vite.ts`)
- **Production**: Static files served from `dist/public` via `server/static.ts`

### Database
- **Database**: PostgreSQL (required — `DATABASE_URL` environment variable must be set)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` — single `candidates` table
- **Migrations**: Managed via `drizzle-kit push` (`npm run db:push`)
- **Connection**: `pg` Pool in `server/db.ts`

#### Candidates Table Schema
| Column | Type | Notes |
|--------|------|-------|
| id | serial | Primary key |
| fullName | text | Required |
| cpf | text | Required (Brazilian tax ID) |
| whatsapp | text | Required |
| email | text | Required |
| birthDate | date | Required |
| isPcd | text | Required (disability status) |
| gender | text | Required |
| maritalStatus | text | Required |
| race | text | Required |
| education | text | Required |
| hasCnh | boolean | Optional (driver's license) |
| licenseType | text | Optional ('completo' or 'apenas_exame') |
| hasInsurance | boolean | Optional |
| status | text | Default 'pending' |
| createdAt | timestamp | Auto-generated |

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `shared/schema.ts` — Drizzle table definitions and Zod insert schemas
- `shared/routes.ts` — API contract definitions (method, path, input/output schemas)

### Build Process
- **Dev**: `npm run dev` — runs `tsx server/index.ts` with Vite middleware for HMR
- **Build**: `npm run build` — runs `script/build.ts` which builds client with Vite and server with esbuild
- **Production**: `npm start` — runs compiled `dist/index.cjs`
- **DB Push**: `npm run db:push` — pushes schema to database

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable
- **Google Fonts**: Nunito font loaded via CSS import; additional fonts loaded in `index.html`
- **Mercado Livre Logo**: Loaded from `https://http2.mlstatic.com/frontend-assets/` CDN
- **YouTube**: Referenced for embedded video content in the survey page
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` (dev only)

### Key NPM Packages
- `express` v5 — HTTP server
- `drizzle-orm` + `drizzle-kit` — Database ORM and migrations
- `pg` — PostgreSQL client
- `zod` — Schema validation
- `wouter` — Client-side routing
- `@tanstack/react-query` — Data fetching
- `react-hook-form` — Form management
- `framer-motion` — Animations
- `shadcn/ui` components (Radix UI based)
- `tailwindcss` — Utility-first CSS