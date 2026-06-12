# @ecw/design-system

A token-driven, accessibility-first Angular component library built from first-party components and Figma-approved designs. No external UI frameworks — every component is purpose-built for the eCW product suite.

---

## Overview

`@ecw/design-system` is the single source of reusable UI for eCW products. It provides:

- **Design tokens** — a three-layer CSS custom-property system (`--ecw-*`) that maps raw palette values through semantic intent to component-specific overrides.
- **Angular components** — standalone, accessible, first-party Angular components implemented directly from Figma specifications.
- **Storybook** — living documentation and visual test harness for every token and component.
- **Chromatic** — automated visual regression snapshots on every pull request.

No components exist yet. The library is in its foundational setup phase (PE-314767). Components are added one Jira at a time.

---

## Tech stack

| Concern | Technology |
|---|---|
| Framework | Angular 21 |
| Build | ng-packagr (`@angular/build:ng-packagr`), output `dist/ecw-design-system` |
| Storybook | @storybook/angular v10 |
| Visual regression | Chromatic |
| CI/CD | GitHub Actions |
| Package manager | npm (v10, Node 22) |

---

## Getting started

**Prerequisites**

- Node 22
- npm (bundled with Node 22)

**Install**

```bash
npm ci
```

---

## Scripts

| Script | Command | Description |
|---|---|---|
| Build library | `npm run build` | Compile and package to `dist/ecw-design-system` |
| Watch build | `npm run watch` | Build in development watch mode |
| Storybook dev | `npm run storybook` | Start Storybook at `http://localhost:6006` |
| Build Storybook | `npm run build-storybook` | Static Storybook build |
| Chromatic | `npm run chromatic` | Publish snapshots to Chromatic |
| Test | `npm run test` | Run unit tests with Vitest |

---

## Project structure

```
designsystem-2.0/
├── projects/
│   └── ecw-design-system/
│       ├── .storybook/              # Storybook config (main.ts, preview.ts)
│       └── src/
│           ├── public-api.ts        # Library public API surface
│           └── lib/
│               └── foundations/
│                   └── tokens/
│                       ├── tokens.css       # Entry point — import this one
│                       ├── primitives.css   # Layer 1: raw palette values
│                       ├── semantics.css    # Layer 2: design-intent mappings
│                       └── components.css   # Layer 3: component-specific tokens
├── .github/
│   └── workflows/
│       ├── ci.yml                   # Lint, build, test on every PR
│       ├── chromatic.yml            # Visual regression on every PR
│       └── publish.yml              # npm publish on GitHub release
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Design tokens

All tokens use the `--ecw-` prefix and are structured in three layers. Import `tokens.css` once at the application root — never import individual layer files.

```css
@import '@ecw/design-system/foundations/tokens/tokens.css';
```

### Three-layer architecture

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1 — Primitives                                   │
│  Raw palette values. The only layer with literal values.│
│  --ecw-color-blue-500, --ecw-space-4, --ecw-radius-md  │
└────────────────────┬────────────────────────────────────┘
                     │ referenced by
┌────────────────────▼────────────────────────────────────┐
│  Layer 2 — Semantics                                    │
│  Design-intent mappings. No literal values.             │
│  --ecw-color-bg-default, --ecw-color-text-muted,       │
│  --ecw-color-brand-primary, --ecw-color-border-focus   │
└────────────────────┬────────────────────────────────────┘
                     │ referenced by
┌────────────────────▼────────────────────────────────────┐
│  Layer 3 — Components                                   │
│  Component-scoped overrides. References semantics.      │
│  --ecw-button-bg-primary, --ecw-input-border-focus     │
└─────────────────────────────────────────────────────────┘
```

**Token values are not yet populated.** Primitive and semantic values are supplied by the design team directly from Figma and will be added in PE-315920 / PE-315919. Do not invent literal values — follow the missing-token policy described in each token file's header comment.

---

## Storybook and Chromatic

**Storybook** serves as the living documentation for the design system. Every component and foundation (tokens, typography, color) has a dedicated story. Run `npm run storybook` to browse locally.

**Chromatic** captures pixel-accurate snapshots of every story on each pull request and compares them to the accepted baseline. Regressions block merge until reviewed. The `CHROMATIC_PROJECT_TOKEN` secret must be set in the GitHub repository settings for the workflow to function.

---

## Publishing

The library is published as `@ecw/design-system` to npm. Publishing is triggered automatically by the `publish.yml` GitHub Actions workflow when a GitHub Release is created. The `NPM_TOKEN` secret must be configured in repository settings before publishing works.

Manual publish (not recommended):

```bash
npm run build
cd dist/ecw-design-system
npm publish --access public
```

---

## Contributing

### Workflow conventions

- **One Jira = one branch = one PR.** Never combine unrelated work.
- **Branch naming:** `feature/<JIRAID>/<short-description>` (e.g. `feature/PE-314767/storybook-foundation`)
- **Commit and PR title:** must begin with the Jira ID (e.g. `PE-314767: Add Storybook foundation docs`)
- **Base branch:** all branches target `main`
- **PRs are raised manually** — never auto-merged.

### Design rules

- **Figma is the source of truth.** Components are implemented only from approved Figma designs.
- **No PrimeNG.** No external UI component libraries of any kind.
- **First-party Angular components only** — every component is purpose-built in this library.
- **Accessibility is required** — every component must meet WCAG 2.1 AA as a minimum.

### Tokens

- Never hardcode literal values in component or semantic styles.
- If a required token is missing, document it in the PR description and open a Jira if the gap is system-wide.

---

## Required repository secrets

| Secret | Used by | Purpose |
|---|---|---|
| `CHROMATIC_PROJECT_TOKEN` | `chromatic.yml` | Authenticate with Chromatic to publish snapshots |
| `NPM_TOKEN` | `publish.yml` | Authenticate with npm to publish the package |

Configure these in **GitHub → Repository → Settings → Secrets and variables → Actions**.
