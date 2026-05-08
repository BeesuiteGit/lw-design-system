# Changelog

All notable changes to `@lw/design-system` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial package scaffold aggregating three internal skills:
  - `design-system-glassmorphism` — design tokens, gradients, typography, interactions, `GlassCard`.
  - `layout-library-responsive` — 15 responsive layout components (Hero, FeatureGrid, PricingTable, BlogGrid, DashboardLayout, DataTable, FormLayout, AdminLayout, ProductGrid, TestimonialSection, FAQLayout, CaseStudyLayout, ComparisonTable, TimelineLayout, ContactFormLayout).
  - `animation-library-framer` — 8 animated components (PageTransition, AnimatedButton, AnimatedInput, AnimatedList, AnimatedModal, LoadingSpinner, ScrollFadeSection, Toast/ToastContainer) and 3 hooks (`useReducedMotion`, `useScrollAnimation`, `useToast`).
- TypeScript types exported alongside every component.
- Vite library build (ESM + CJS), CSS Modules with `lw_` prefix, declaration files via `vite-plugin-dts`.

## [0.1.0] - TBD

First pre-release. Not yet published.
