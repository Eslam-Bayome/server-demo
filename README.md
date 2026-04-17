# ServerWatch

**ServerWatch** is a demo **server monitoring dashboard** built with **Next.js** (App Router). It shows a fleet overview with status, response time, and uptime, plus per-server detail pages. Auth and APIs are **mocked** so you can run the UI locally without a backend.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)

---

## Features

- **Dashboard** — Grid or table view, search, status filter, column sorting (client-side on loaded data).
- **Server detail** — Single-server view driven by dynamic route `/dashboard/[server_id]`.
- **Auth screens** — Login and signup with mock validation; session stored in **localStorage** and mirrored to an **`auth_token` cookie** for route protection.
- **Route protection** — [`proxy.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) (Next.js 16) redirects unauthenticated users away from `/dashboard` and signed-in users away from `/login` and `/signup`.
- **UI structure** — Reusable atoms → templates under `components/common/`, feature UI under `components/ui/`.

---

## Prerequisites

- **Node.js** 20+ (recommended), or **Bun** — matching what you use for local development.
- **npm**, **pnpm**, **yarn**, or **bun** for installs and scripts.

---

## Quick start

Clone the repository, install dependencies, and start the dev server:

```bash
cd server-demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home route redirects to **`/dashboard`**.

### Demo login (mock API)

Use the seeded account from `integration/mock_data/auth.mock.ts`:

| Field | Value |
|--------|--------|
| Email | `admin@serverwatch.io` |
| Password | `password123` |

You can also **sign up** with a new email; new accounts exist only in memory until you reload the app (mock limitation).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Run the production server (after `build`). |
| `npm run lint` | Run ESLint on the project. |

---

## Project layout (overview)

```
app/                    # App Router: pages, layouts, loading.tsx
proxy.ts                # Next.js proxy — auth redirects (dashboard vs login/signup)
lib/                    # Constants, auth session helpers, cn/formatters
integration/            # Services, types, mock data (API-shaped layer)
hooks/                  # Client hooks (URL params, dashboard filters)
helpers/                # Pure filter/sort helpers for servers
components/common/      # Atoms, molecules, organisms, templates
components/ui/          # Auth + dashboard feature components
docs/CODE.md            # In-depth code documentation
```

For architecture, data flow, and extension points, see **[docs/CODE.md](docs/CODE.md)**.

---

## Tech stack

- **[Next.js 16](https://nextjs.org/docs)** — App Router, Server Components, `next/font` (Geist).
- **React 19** — Client components for interactive UI.
- **Tailwind CSS 4** — Styling (`app/globals.css`, PostCSS).
- **TypeScript** — Strict mode (`tsconfig.json`).
- **Lucide React** — Icons.

Some packages in `package.json` (for example MUI or `next-auth`) are not used in the current source tree; you can adopt or remove them as you evolve the app.

---

## Configuration

- **Path alias** — `@/` maps to the repository root (`tsconfig.json`).
- **Proxy matcher** — Defined in `proxy.ts` (`export const config.matcher`) so the proxy skips static assets and Next internals.

No `.env` file is required for the default mock setup. When you add a real API, use `.env.local` (and document variables here).

---

## Deployment

ServerWatch is a standard Next.js app. Deploy to **[Vercel](https://vercel.com)** or any host that supports Node:

```bash
npm run build && npm run start
```

Ensure your production URL and cookie settings (`SameSite`, `Secure`) match your deployment if you move beyond the mock auth flow.

---

## Documentation

| Document | Contents |
|----------|----------|
| [docs/CODE.md](docs/CODE.md) | Architecture, modules, auth, services, how to replace mocks |

---

## License

This project is **private** / unlicensed unless you add a `LICENSE` file. Add one if you plan to open-source it.
