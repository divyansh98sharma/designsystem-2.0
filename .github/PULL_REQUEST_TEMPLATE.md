## PR title must start with the Jira ID (e.g. `PE-XXXXXX: ...`)

---

**Jira:** <!-- PE-XXXXXX link or ID -->

**Summary**
<!-- What does this PR do? Why? -->

**Figma reference**
<!-- Link to the Figma component/frame — Figma is the source of truth for anatomy, tokens, and visual spec -->

---

## Checklist

- [ ] Angular 21 component implementation (first-party, no PrimeNG, no external UI library)
- [ ] Figma component reviewed — anatomy, variants, states, sizes, spacing, typography, colors, radius/shadows matched
- [ ] Variants / sizes / states implemented where applicable
- [ ] Component tokens used (component → semantic → primitive); no hardcoded raw values
- [ ] Missing tokens or Figma gaps documented in this PR
- [ ] Storybook stories + docs added (default, variants, sizes, states, disabled, error)
- [ ] Inputs/outputs/API documented
- [ ] Accessibility reviewed (keyboard, focus visibility, ARIA, screen-reader labels, contrast, tab order)
- [ ] Public API export added (`public-api.ts`)
- [ ] `npm run build` passes
- [ ] `npm run build-storybook` passes
- [ ] Chromatic check runs and visual changes reviewed
- [ ] PR scoped to ONE Jira, targets `main`, not auto-merged

---

## Notes / decisions
<!-- Anything reviewers should know: trade-offs, deviations from Figma, follow-up tickets, etc. -->
