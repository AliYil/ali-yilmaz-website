# AGENTS.md

## Purpose

- This repository is a Nuxt 4 personal website and blog for `aliyil.com`.
- The app is bilingual: Turkish is the default locale and English is mounted under `/en`.
- Content lives in `content/` and is loaded through `@nuxt/content` collections.
- UI is built with Vue 3, Nuxt 4, Tailwind CSS 4, `@nuxt/icon`, and `@nuxtjs/color-mode`.
- Use this file as the working agreement for agentic coding tools operating in this repo.

## Rule Files

- No `.cursor/rules/` directory was found.
- No `.cursorrules` file was found.
- No `.github/copilot-instructions.md` file was found.
- If any of those files are added later, treat them as higher-priority repo instructions and merge them into your plan before editing code.

## Repo Layout

- `app/app.vue` is the root app shell.
- `app/layouts/default.vue` wraps the shared page chrome.
- `app/pages/` contains route components; filenames map directly to routes.
- `app/components/` contains shared Vue components in PascalCase.
- `app/lib/utils.ts` contains shared TypeScript utilities.
- `app/assets/css/tailwind.css` defines theme tokens, base styles, and custom animations.
- `content/en/` and `content/tr/` contain localized blog posts and project entries.
- `i18n/locales/en.json` and `i18n/locales/tr.json` contain translation strings.
- `public/` holds static images, the favicon, and downloadable assets.
- `.github/workflows/deploy.yml` documents the GitHub Pages build path.

## Install And Setup

- Use `npm install` to install dependencies.
- Node `20` is used in CI via `actions/setup-node@v4`; prefer Node 20 locally as well.
- `npm install` triggers `nuxt prepare` through `postinstall`.
- The project uses `package-lock.json`; prefer `npm`, not `pnpm` or `yarn`, unless the repo is updated.

## Primary Commands

- `npm run dev` - start the local Nuxt dev server.
- `npm run build` - production build using the default Nitro preset.
- `npm run generate` - generate the static site output.
- `npm run preview` - preview the generated production output.
- `npx nuxt build --preset github_pages` - CI/deploy build used by `.github/workflows/deploy.yml`.

## Lint, Typecheck, And Test Status

- There is currently no `lint` script in `package.json`.
- There is currently no configured unit test runner such as Vitest or Jest.
- There is currently no end-to-end test runner such as Playwright or Cypress.
- There is no single-test command today because no test framework is configured.
- If you add tests, also add a documented single-test command and update this file.

## Verification Commands Agents Should Use

- For routine UI/content changes, run `npm run build`.
- For static hosting changes, also run `npm run generate` when relevant.
- For deploy-path validation, run `npx nuxt build --preset github_pages`.
- If you introduce a test framework, run the narrowest relevant test target before broad suites.

## Known Command Caveats

- `npm run build` succeeds at the time of writing.
- `npm run build` emits a warning that `components/ui` does not exist; this comes from the `shadcn-nuxt` config and is currently non-fatal.
- `npx nuxt typecheck` currently fails because of a Vite plugin type mismatch around `@tailwindcss/vite` in `nuxt.config.ts`.
- Do not claim typechecking passes unless you have fixed that config issue and rerun the command.

## Single-Test Guidance

- No single-test command exists yet because the repo has no test runner.
- If Vitest is added later, prefer a file-level command such as `npx vitest run path/to/file.test.ts`.
- If Playwright is added later, prefer a file-level command such as `npx playwright test tests/example.spec.ts`.
- When adding any test tool, document both the full-suite command and the single-test command in `package.json` scripts.

## Tech And Runtime Notes

- Nuxt config lives in `nuxt.config.ts`.
- Content schemas live in `content.config.ts` and use Zod via `@nuxt/content`.
- TypeScript config extends the generated Nuxt config from `.nuxt/tsconfig.json`.
- `components.json` defines shadcn aliases like `@/components`, `@/lib`, and `@/composables`.
- Auto-imported Nuxt and Vue composables are used heavily; explicit imports are often unnecessary.

## Code Style

- Follow the existing code style in each file instead of imposing a new formatter style.
- Prefer `<script setup lang="ts">` for Vue single-file components.
- Use TypeScript in script blocks and utility files.
- Keep components, pages, and layouts small enough to scan, even if some existing files are larger.
- Prefer composition-style code with `const` declarations, computed values, composables, and small helper functions.
- Use single quotes in most repo-authored TypeScript and config files unless the file already uses double quotes consistently.
- Use semicolon-free style, matching current files.
- Keep template indentation at two spaces and break long attributes across lines.
- Avoid adding comments unless the code would otherwise be hard to follow.

## Imports And Auto-Imports

- Rely on Nuxt auto-imports for common composables like `ref`, `computed`, `onMounted`, `useAsyncData`, `useHead`, `useI18n`, and `useLocalePath`.
- Use explicit imports for third-party utilities, as in `app/lib/utils.ts`.
- Put `import type` statements before value imports when both are needed.
- Keep imports grouped simply: types first, then values.
- Do not add unused imports; remove them when touching a file.

## Types

- Prefer explicit parameter types for public helpers and event handlers.
- Use narrow types like `string[]` instead of broad `any[]`.
- Avoid `any` unless there is no practical alternative.
- Prefer inferred return types for short local helpers unless the type is non-obvious.
- Respect the schemas in `content.config.ts`; content shape changes should update the schema first.

## Naming

- Use PascalCase for component filenames, for example `SiteHeader.vue`.
- Use route-oriented lowercase names for page files, including dynamic route syntax like `[slug].vue`.
- Use camelCase for variables, functions, refs, and computed values.
- Use descriptive names tied to UI intent, for example `lightboxOpen`, `otherLocale`, and `sectionHref`.
- Use clear cache keys for `useAsyncData`, typically including locale and route-specific identifiers.

## Vue And Nuxt Patterns

- Prefer top-level awaited `useAsyncData(...)` in page components for content fetching.
- Query content with `queryCollection(...)` and keep locale filtering explicit.
- Use `useHead(...)` for page-specific SEO metadata.
- Throw Nuxt errors with `createError(...)` for missing route content instead of silently failing.
- Clean up browser event listeners with `onUnmounted(...)`; one page currently does this well and other pages should follow that pattern.
- Prefer `NuxtLink` for internal navigation and `<a>` for external links.
- Add `rel="noopener noreferrer"` on external links that open in a new tab.

## Tailwind And Styling

- Reuse the design tokens defined in `app/assets/css/tailwind.css`.
- Prefer semantic Tailwind tokens like `bg-card`, `text-muted-foreground`, and `border-border` over raw arbitrary colors.
- Keep custom colors and radii in CSS variables rather than scattering one-off values.
- Preserve existing animation naming and patterns such as `animate-glow-1`.
- Use scoped styles only when utility classes are not enough.
- Keep background, color-mode, and typography behavior consistent with the existing site.

## Content And i18n Rules

- Any user-facing copy change usually needs updates in both `i18n/locales/tr.json` and `i18n/locales/en.json`.
- Keep translation key structure aligned across locales.
- Blog posts exist under both `content/tr/blog/` and `content/en/blog/`; maintain parity when editing translated content.
- Project data exists under both `content/tr/projects/` and `content/en/projects/`; keep paired entries in sync.
- Respect the content schemas for blog frontmatter and project YAML fields.

## Error Handling

- Fail explicitly for missing content or impossible states; do not hide errors.
- Use `createError({ statusCode, statusMessage })` for route-level failures.
- Guard DOM-only behavior behind client lifecycle hooks like `onMounted(...)`.
- Before adding async logic with side effects, consider loading, null, and locale-change states.

## Agent Workflow Expectations

- Before editing, inspect neighboring files for local conventions.
- Prefer the smallest safe change that fits existing architecture.
- Do not add new dependencies unless they materially improve the repo and are necessary for the task.
- If you add tooling such as linting or tests, update `package.json`, this file, and any CI workflows that should use it.
- After code changes, report the exact verification commands you ran and any warnings or failures that remain.

## High-Value Improvement Opportunities

- Add a real lint script, likely with Nuxt ESLint integration.
- Add a test runner and expose both suite-level and single-test scripts.
- Resolve the `npx nuxt typecheck` incompatibility in `nuxt.config.ts`.
- Either create `app/components/ui/` or remove the stale shadcn component-dir warning if the project will not use generated UI components.
