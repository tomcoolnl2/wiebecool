# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A Next.js 14 (App Router) portfolio/artist site for "Wiebe Cool", deployed on Vercel. Content is authored in Contentful and fetched via GraphQL; there is no local database. Dutch is the primary locale — routes and copy are Dutch-first with English fallbacks handled through Next.js rewrites/redirects (e.g. `/` ↔ `/home`, `/over-mij` ↔ `/about`).

## Commands

Use Node `v24.18.0` (see `.nvmrc`; `nvm use` before anything else if versions drift).

```bash
npm install
npm run dev              # start dev server on :3000
npm run build             # production build
npm run lint               # ESLint (next + storybook config)
npm run format             # Prettier write across the repo
npm run ui                 # Storybook dev server on :6006
npm run build-storybook
npm run e2e                # Cypress, interactive GUI against localhost:3000
npm run e2e:headless        # Cypress, headless run against localhost:3000
npm run analyze              # production build with bundle analyzer
```

Notes:
- There is no unit test runner configured — `npm test` is a no-op placeholder. Test coverage is via Cypress e2e (`cypress/e2e`) and Storybook interaction tests, not Jest/Vitest.
- To run a single Cypress spec: `npx cypress run --e2e --spec "cypress/e2e/<file>.cy.ts"`.
- `npm run e2e*` scripts use `start-server-and-test`, so they boot the dev server automatically — don't start `npm run dev` separately first.

## Environment variables

Contentful and EmailJS/reCAPTCHA keys are required (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `NEXT_PUBLIC_EMAILJS_*`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, etc.) via a local `.env.local` file. These same keys must be kept in sync in three places: `.env.local`, Vercel project env vars, and GitHub Actions repo secrets (used by the Cypress CI job). Never commit real values.

## Architecture

**Data flow (Contentful → typed content):**
- [lib/api.ts](lib/api.ts) is the single data-access layer. Every fetch goes through `fetchContentfulData` (React `cache()`-wrapped POST to the Contentful GraphQL endpoint), then a page-specific `fetch*Page()` function shapes the raw GraphQL response into the app's page model.
- GraphQL documents live in `graphql/*.gql` and are imported directly as modules (webpack loader configured in [next.config.js](next.config.js) via `graphql-tag/loader`).
- Response shapes vs. app-facing shapes are both declared in `model/` — `model/schema.ts`/`model/api.ts` mirror the raw Contentful GraphQL response, `model/page.ts` defines the normalized types components actually consume (`HomePage`, `DetailPage`, `CollectionPage`, etc.). When adding a new content type, add the `.gql` query, extend both response and page-facing interfaces in `model/`, then add a `fetch*` function in `lib/api.ts`.
- Errors from Contentful fetches are normalized to `ContentfulError` ([lib/error.ts](lib/error.ts)); `fetchData()` in `lib/api.ts` funnels failures into Next's `notFound()`.

**Routing:**
- App Router pages live under `app/` (`home`, `about`, `collection/[[...slug]]`, `detail/[...slug]`, `contact`) but the public-facing Dutch URLs are produced by `rewrites()`/`redirects()` in [next.config.js](next.config.js) — e.g. `/werk/:slug*` rewrites to `/detail/:slug*` internally, while `/werk` itself redirects to `/collectie`. When changing a route, check both the folder under `app/` and the rewrite/redirect table; they're independent.
- `PageType` and `ReWriteRule` in [model/page.ts](model/page.ts) map page types to their canonical Dutch slug prefixes and are used for cross-linking (e.g. building detail-card hrefs from a `PageType`).

**Rendering shell:**
- [app/layout.tsx](app/layout.tsx) fetches global config, navigation and artist data once per request (in parallel) and renders the persistent chrome (`MainNavigation`, `Background`, `CookieBar`, `Cursor`, `PreLoader`) around `children`.
- Components are flat under `components/`, with two sub-namespaces: `components/page/*` (page-level building blocks like `MainNavigation`, `PageHeader`, `BreadCrumbs`) and `components/hoc/*` (render-prop/HOC helpers like `RenderComponent`, used to switch on `PageType`/content-block type).

**Content blocks:** Home/About/Collection pages compose a `buildingBlocksCollection` of polymorphic Contentful entries (currently `TextBlockResponse | PortfolioCardResponse`) — components that render these switch on entry shape/type rather than page type.

## Conventions

- Commit messages must follow Conventional Commits (`commitlint` + `@commitlint/config-conventional`, enforced by Husky's `commit-msg` hook) — e.g. `feat: add carousel`, `fix: correct slug redirect`. This directly drives `semantic-release` versioning on `main`, so commit type matters.
- Husky's `pre-commit` hook runs `npm test` (currently a no-op) — don't rely on it for real verification; run `npm run lint` and relevant Cypress specs yourself before committing.
- Releases happen only from `main` via `semantic-release` (GitHub Action on push to `main`); `develop` is the working/staging branch deployed to a separate Vercel preview URL. Don't hand-edit `CHANGELOG.md` or `package.json` version — semantic-release owns both.
- Tabs for indentation (width 4), single quotes, 150-char print width — enforced by Prettier (`.prettierrc`). Run `npm run format` rather than hand-formatting.
