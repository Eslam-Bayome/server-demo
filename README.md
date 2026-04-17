# ServerWatch

A small server monitoring dashboard demo: see your “servers” in a list, filter and sort them, open details for each one, and sign in with mock auth. There is no real backend—everything runs in the browser with fake data so you can focus on the UI.

---

## How to run it

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open **http://localhost:3000** in your browser. You’ll land on the dashboard (the home page redirects there).

**Try logging in** (optional): use `admin@serverwatch.io` / `password123`, or create an account on the signup page. Signups only live until you refresh the page—that’s normal for this mock setup.

**Other commands:**

- `npm run build` — production build  
- `npm run start` — run the built app  
- `npm run lint` — check code with ESLint  

---

## How it’s built (short version)

**Stack:** Next.js (App Router), React, TypeScript, Tailwind. Icons from Lucide.

**Data:** Server lists and auth responses come from mock modules under `integration/`, not from a real API. That keeps the app easy to run and change without env vars or databases.

**Pages:** Routes live in `app/`. The dashboard loads server data in server components; filters and sorting happen mostly on the client so the UI feels quick.

**Auth:** Login/signup call mock services. On success we save the user in **localStorage** and set a small **cookie** so `proxy.ts` (Next.js route guard) can send logged-out people to login and logged-in people away from the auth pages.

**Components:** Shared pieces (buttons, layout shells, etc.) sit in `components/common/`. Screens that tie everything together are in `components/ui/`. It’s a simple “small pieces → bigger pieces” structure so the code isn’t one giant file.

**More detail:** If you want a deeper walkthrough of folders and flows, see [docs/CODE.md](docs/CODE.md).

---

## Why this design?

**Not over-engineered.** The split is on purpose, not ceremony: UI doesn’t know where data comes from—that lives in `integration/`. Shared building blocks live in `components/common/`; feature screens in `components/ui/`. Helpers and hooks hold small bits of logic so we’re not copying the same filter/sort/URL logic everywhere. Each folder has one job; that’s easier to read than one giant file or a pile of abstractions you don’t need yet.

**Room to grow.** When you add a real API, you mostly swap the implementations in `integration/service/` (and types if the contract changes). Pages and most components can stay as-is because they already talk to functions and types, not raw mock JSON sprinkled through the app. New routes follow the same `app/` pattern; new dashboard bits drop into `components/ui/dashboard` and reuse what’s in `common/`.

**Easy to maintain.** Route names and labels stay in `lib/constants.ts`. Types sit next to the integration layer, so when the API shape changes, TypeScript nudges you toward the right fixes. Auth is explicit: mock services today, cookie + `proxy.ts` for route protection—clear seams if you move to real sessions later.

**Reality check:** Mock auth and localStorage are fine for a demo; production would use proper server-side sessions or tokens. The point is the **structure** scales: swapping auth or data is a bounded change, not a rewrite. See [docs/CODE.md](docs/CODE.md) for more.
