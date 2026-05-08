# @lw/design-system

Modern React design system with **glassmorphism aesthetics**, **responsive layouts**, and **Framer Motion animations**. TypeScript-first, WCAG AAA, dark mode built-in.

> Pre-release scaffold (v0.1.0) — not yet published to npm.

---

## What's inside

- **Design system**: CSS design tokens (colors, spacing, typography, shadows, radius, transitions), gradients, typography pairing (Sora + Inter), interactions, and a frosted-glass `GlassCard`.
- **15 responsive layouts**: `HeroSection`, `FeatureGrid`, `PricingTable`, `BlogGrid`, `DashboardLayout`, `DataTable`, `FormLayout`, `AdminLayout`, `ProductGrid`, `TestimonialSection`, `FAQLayout`, `CaseStudyLayout`, `ComparisonTable`, `TimelineLayout`, `ContactFormLayout`.
- **8 animated components**: `PageTransition`, `AnimatedButton`, `AnimatedInput`, `AnimatedList`, `AnimatedModal`, `LoadingSpinner`, `ScrollFadeSection`, `Toast` + `ToastContainer`.
- **3 hooks**: `useReducedMotion`, `useScrollAnimation`, `useToast`.

Every component:

- ships with full TypeScript prop interfaces,
- respects `prefers-reduced-motion`,
- supports dark mode via CSS variables,
- targets WCAG AAA contrast and 44 px touch targets,
- breakpoints at 640 / 768 / 1024 / 1280 px.

---

## Installation

```bash
npm install @lw/design-system
# peer deps:
npm install react react-dom
```

Runtime dependencies (`framer-motion`, `react-intersection-observer`, `clsx`) install transitively.

---

## Quick start

```tsx
// 1. Load tokens BEFORE the rest of the styles (single source of truth for CSS variables).
import '@lw/design-system/styles/tokens';
import '@lw/design-system/styles';

import { GlassCard, HeroSection, AnimatedButton, useToast, ToastContainer } from '@lw/design-system';

export function App() {
  const { toasts, push } = useToast();

  return (
    <>
      <HeroSection
        title="Ship beautiful UIs faster"
        subtitle="Glassmorphism, responsive layouts, smooth motion."
        primaryCta={{ label: 'Get started', onClick: () => push({ type: 'success', message: 'Welcome!' }) }}
      />

      <GlassCard accentColor="primary">
        <h2>Polished by default</h2>
        <p>Every component respects prefers-reduced-motion and hits WCAG AAA.</p>
        <AnimatedButton variant="primary">Learn more</AnimatedButton>
      </GlassCard>

      <ToastContainer toasts={toasts} />
    </>
  );
}
```

---

## Project structure

```
louisweiss-design-system/
├── src/
│   ├── components/   24 .tsx components + .module.css
│   ├── hooks/        useReducedMotion, useScrollAnimation, useToast
│   ├── styles/       gradients.css, typography.css, interactions.css, index.css
│   ├── tokens/       design-tokens.css, design-tokens.json
│   └── index.ts      main barrel export
├── stories/          Storybook stories (not published)
├── examples/         usage examples (not published)
├── dist/             build output (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Build & develop

```bash
npm install      # install deps
npm run dev      # vite build --watch
npm run build    # production build → dist/
npm run typecheck
```

The package is built with **Vite library mode** (ESM + CJS) and **vite-plugin-dts** for declaration files. CSS Modules are scoped with the `lw_` prefix to avoid collisions in consumer apps.

---

## CSS tokens

Tokens live in `src/tokens/design-tokens.css` and are also exported as JSON for Figma at `src/tokens/design-tokens.json`. They drive every component — override the CSS variables in your own `:root` to rebrand the entire system.

```css
:root {
  --color-primary: #6366f1;
  --color-accent: #ec4899;
  --space-lg: 1.5rem;
  /* … */
}
```

---

## Accessibility

- All interactive elements have visible focus indicators.
- `prefers-reduced-motion` is honored across every animation (via `useReducedMotion`).
- Semantic HTML5 (`<section>`, `<article>`, `<nav>`, `<header>`, `<main>`).
- WCAG AAA contrast ratios on light + dark themes.
- 44 × 44 px minimum touch targets on mobile.

---

## Roadmap

- [ ] Storybook deployment (free demo)
- [ ] Visual regression tests
- [ ] Premium variants (paid tier)
- [ ] Figma library mirroring the JSON tokens
- [ ] Per-component tree-shakable subpath imports

---

## License

[MIT](./LICENSE) © Contributors
