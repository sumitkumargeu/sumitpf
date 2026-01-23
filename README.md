# Dexter Portfolio

**Production URL**: https://sumit.paydrive.in/

A modern, responsive personal portfolio built with Vite + React + TypeScript. The content is designed to be **data-driven** (JSON files under `src/data`) so you can update sections like About, Skills, Socials, etc. without touching component code.

---

## Features

- **Fast**: Vite dev server + optimized production build.
- **Modern UI stack**: Tailwind CSS + shadcn/ui + Radix.
- **Animated sections**: framer-motion based transitions.
- **Data-driven content**: update JSON in `src/data` to change content.
- **SEO + Social previews**: `index.html` includes Open Graph, Twitter tags, JSON-LD, and `og-image.png`.

---

## Tech stack

- **Framework**: React 18
- **Build tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI components**: shadcn/ui + Radix UI
- **Animations**: framer-motion
- **Icons**: lucide-react

---

## Project structure (high level)

```text
.
├─ public/
│  ├─ og-image.png
│  └─ ...
├─ src/
│  ├─ assets/
│  │  └─ sumit.png
│  ├─ components/
│  ├─ components/ui/
│  ├─ data/
│  │  ├─ about.json
│  │  ├─ profile.json
│  │  ├─ socials.json
│  │  └─ ...
│  ├─ pages/
│  ├─ lib/
│  └─ main.tsx
├─ index.html
├─ vite.config.ts
└─ package.json
```

---

## Running locally

### Prerequisites

- Node.js (recommended: install via `nvm`)
- npm (or pnpm/yarn if you prefer)

### Install

```sh
npm install
```

### Development server

```sh
npm run dev
```

The app will be served on the local Vite port (configured in `vite.config.ts`).

### Production build

```sh
npm run build
```

### Preview the production build

```sh
npm run preview
```

---

## “Dynamic” content editing (no code changes)

The portfolio is designed so most changes happen in `src/data/*.json`.

### `src/data/profile.json`

Controls identity-level info used across the site:

- `name`
- `title`
- `tagline`
- `location`
- `email`
- `bio`
- `education`
- `experience`
- `funFact`

Notes:

- If a component reads `profile.avatar`, keep it as a valid URL.
- The hero image currently uses a bundled image from `src/assets/sumit.png` (so deploys won’t break if an external host removes images).

### `src/data/about.json`

Used to drive About/Tags content (e.g. badges/skill tags shown in the hero/sections).

### `src/data/socials.json`

Used to render social/contact cards and links.

---

## Images / branding

### Social preview + logos

This repo standardizes on:

- `public/og-image.png`

It is used for:

- Open Graph preview (`og:image`)
- Twitter preview (`twitter:image`)
- Favicon (`<link rel="icon">`)
- Apple touch icon (`<link rel="apple-touch-icon">`)

If you replace the image, keep the same filename to avoid changing code.

### Hero avatar

The hero section uses a local image:

- `src/assets/sumit.png`

Replace that file (same filename) to swap the hero avatar without editing code.

---

## SEO configuration (domain-aware)

SEO is configured in `index.html`:

- `canonical`: `https://sumit.paydrive.in/`
- Open Graph tags (`og:*`)
- Twitter tags (`twitter:*`)
- JSON‑LD structured data (`application/ld+json`)

When changing domains, update:

- `link rel="canonical"`
- `og:url`
- `twitter:url`
- JSON‑LD `url`

---

## Deployment

You can deploy anywhere that serves static files.

### Option A: Nginx (static hosting)

1. Build:

```sh
npm run build
```

2. Upload `dist/` to your server.
3. Configure Nginx to serve the `dist/` folder and (important) route SPA paths to `index.html`.

### Option B: Netlify / Vercel / Cloudflare Pages

- **Build command**: `npm run build`
- **Output directory**: `dist`

After connecting the custom domain, ensure it resolves to:

- `sumit.paydrive.in`

---

## Troubleshooting

### “Cannot find module 'react' / 'vite' / 'framer-motion'” in the editor

Usually means dependencies are not installed or the TS server needs a restart.

- Run `npm install`
- Restart the TypeScript server (VS Code command)

### “Lovable” references in `package-lock.json`

If you removed a dependency and still see old strings in the lockfile:

- Run `npm install` once to regenerate `package-lock.json`

---

## License

Private project (adjust as needed).
