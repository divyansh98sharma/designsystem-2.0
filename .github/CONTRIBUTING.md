# Contributing to @ecw/design-system

## Branch and PR rules

| Rule | Detail |
|---|---|
| **One Jira = one branch = one PR** | Each branch and PR maps to exactly one Jira ticket. |
| **Branch format** | `feature/<JIRAID>/<short-description>` — e.g. `feature/PE-314767/button-component` |
| **Commit messages** | Start with the Jira ID — e.g. `PE-314767: add Button component` |
| **PR titles** | Start with the Jira ID — e.g. `PE-314767: Button component` |
| **Target branch** | Always target `main`. Never branch off or target a feature branch. |
| **No auto-merge** | PRs must be reviewed and manually merged. Never use auto-merge. |

## Before pushing

Always run these locally and confirm they pass before opening a PR:

```bash
npm run build           # builds the library (dist/ecw-design-system)
npm run build-storybook # validates the Storybook build
```

Chromatic runs automatically in CI once the PR is open.

## Component implementation rules

- **No PrimeNG. No external UI component libraries.** All components are first-party Angular 21 implementations.
- **Figma is the source of truth.** Match anatomy, variants, states, sizes, spacing, typography, colors, radius, and shadows exactly as specified in Figma.
- **Token hierarchy.** Use component tokens → semantic tokens → primitive tokens. Never hardcode raw values (colors, spacing, radii, etc.) directly in component styles.
- **Document gaps.** If a token is missing or Figma is ambiguous, document it in the PR description and create a follow-up Jira ticket.

## Storybook

Every component must have Storybook stories covering: default, all variants, all sizes, all states (hover, focus, active, disabled, error). Add an `autodocs` doc page so the API is auto-documented.

## Accessibility

Review every component for keyboard navigation, visible focus, ARIA roles/labels, screen-reader announcements, color contrast (WCAG AA minimum), and tab order before marking the checklist done.

## Secrets (maintainers only)

| Secret | Purpose |
|---|---|
| `CHROMATIC_PROJECT_TOKEN` | Chromatic visual regression |
| `NPM_TOKEN` | npm publish for `@ecw/design-system` |

Set these under **Settings → Secrets and variables → Actions** in the GitHub repo.
