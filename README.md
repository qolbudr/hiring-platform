This repository contains a Next.js + TypeScript hiring platform project built with the app router.

## Project Overview

A small hiring-platform web application that supports user authentication, job listings, applicant flows, and a simple admin dashboard. The app includes client and server code (Next.js app routes) and basic integrations for file/photo picking and JWT-based authentication.

## Tech Stack Used

- Next.js (App Router)
- React
- TypeScript
- Node.js
- Zod (validation) — schemas are in module/*/schema
- JWT for auth (see `shared/lib/jwt.ts`)
- Firebase utilities present in `shared/lib/firebase.ts` (if used for storage/auth)
- PostCSS / CSS modules for styling (see `app/globals.css`)

## How to Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root and add required environment variables. Example placeholders you should replace with real values:

```
# Example env variables - replace these with real values used by your setup
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_JWT_SECRET=
NEXT_PUBLIC_API_BASE_URL=
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser.

Notes:
- If the project uses Firebase or other third-party services, ensure the corresponding credentials are configured.
- The API routes live under `src/app/api/*` and expect cookie headers for protected endpoints.

## Deployment

Deploy to Vercel (recommended) or any static/Node host that supports Next.js. Make sure to set the environment variables on the host.

## Where to find important files

- App entry: `src/app`
- API routes: `src/app/api`
- Modules: `src/module` (job, auth, applications)
- Shared utilities/components: `src/shared`
