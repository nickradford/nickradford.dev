# React to Astro Component Refactoring Plan

## Overview
This site has 28 React components (`.tsx` files) mixed with Astro components and pages. Most components are purely presentational with no client-side interactivity, making them excellent candidates for conversion to Astro components. Only ~4-5 components truly require React due to their interactive nature.

**Estimated refactor scope:** ~20 components can be converted to Astro (71% of React components)

---

## Component Usage Summary

| Component | Status | Uses | Used In | Priority | Notes |
|-----------|--------|------|---------|----------|-------|
| DecodeText.tsx | 🔴 Keep | 8 | index.astro, work.astro, blog/index.astro, BlogPage.tsx | CRITICAL | Complex animation, requires React |
| Page.tsx | 🟡 Refactor | 19 | BlogPage.tsx, index.astro, work.astro, blog/[slug].astro, blog/index.astro | HIGH | Wrapper component, convert to Astro |
| ExternalLink.tsx | 🟢 Convert | 8 | Footer.tsx, BlogPostPreview.tsx, AtomLink.tsx | HIGH | Pure presentational |
| ThemeToggle.tsx | 🟡 Convert | 4 | PageHeader.tsx | HIGH | Simple toggle, can use vanilla JS |
| Footer.tsx | 🟢 Convert | 4 | Page.tsx | HIGH | Pure presentational |
| DitherTriangle.tsx | 🟢 Convert | 4 | Commented out in social-card.tsx | LOW | SVG decoration, not actively used |
| BlogPostPreview.tsx | 🟢 Convert | 6 | HomepageBlog.tsx, blog/index.astro | HIGH | Pure presentational |
| BackButton.tsx | 🟢 Convert | 3 | BlogPage.tsx | HIGH | Simple button with history.back() |
| ByLine.tsx | 🟢 Convert | 3 | BlogPage.tsx, blog/[slug].astro | HIGH | Pure presentational |
| AtomLink.tsx | 🟢 Convert | 3 | BlogPage.tsx, blog/[slug].astro | HIGH | Pure presentational |
| DraftToggle.tsx | 🟡 Evaluate | 3 | index.astro | MEDIUM | Dev-only, simple state toggle |
| HomepageBlog.tsx | 🟡 Refactor | 3 | index.astro | MEDIUM | Filters posts, uses localStorage |
| PageHeader.tsx | 🟡 Refactor | 2 | BaseLayout.astro | HIGH | Navigation, has active route detection |
| Button.tsx | ⚪ Not Used | 0 | Exported but not imported anywhere | LOW | **UNUSED - Safe to delete** |
| JobItem.tsx | ⚪ Not Used | 0 | Only exported, never imported | LOW | **UNUSED - Safe to delete** |
| Progress.tsx | ⚪ Not Used | 0 | Defined but never used | LOW | **UNUSED - Safe to delete** |
| SocialCard.tsx | 🟢 Keep | 3 | open-graph.astro (client:only="react") | LOW | Used for OG image generation, needs React |
| Typography.tsx | 🟢 Convert | 5 | work.astro, blog/index.astro (H1, H2, Text exports) | HIGH | Pure utility components |
| BlogPage.tsx | 🟡 Refactor | 3 | blog/[slug].astro | HIGH | Layout wrapper, contains DecodeText |

---

## Unused Components (Safe to Delete)

### 1. **Button.tsx** (0 uses)
- Exported in index.tsx but never imported anywhere
- Can be safely removed

### 2. **JobItem.tsx** (0 uses)
- Exported in index.tsx but never imported anywhere
- Job data is rendered inline in work.astro instead
- Can be safely removed

### 3. **Progress.tsx** (0 uses)
- Component exists but is not used on any page
- Appears to be legacy/abandoned
- Can be safely removed if not needed for future features

---

## Component Analysis

### ✅ HIGH PRIORITY - Pure Presentational Components (18 components)

These have **zero interactivity** and should be converted immediately:

#### Typography & Layout Wrappers (3)
- **Typography.tsx** → `Typography.astro`
  - Pure CSS class utilities (H1, H2, H3, Text, LightGray, Bold, Code)
  - No state, no hooks
  - **Conversion complexity:** Trivial

- **BackButton.tsx** → `BackButton.astro`
  - Has onClick handler using `window.history.back()`
  - Can be converted to native HTML + inline script
  - **Conversion complexity:** Very low

- **Page.tsx** → `Page.astro`
  - Pure layout wrapper with slot for children
  - Renders `<Footer>` component
  - **Conversion complexity:** Very low

#### Blog Components (4)
- **ByLine.tsx** → `ByLine.astro`
  - Displays post metadata (author, date, reading time)
  - Pure presentational, no hooks
  - Date formatting logic can be moved to Astro
  - **Conversion complexity:** Trivial

- **BlogPostPreview.tsx** → `BlogPostPreview.astro`
  - Renders blog post card with date, title, excerpt
  - Pure presentational
  - **Conversion complexity:** Trivial

- **BlogPage.tsx** → `BlogPage.astro`
  - Layout wrapper for individual blog posts
  - Contains DecodeText (interactive) - needs client:only directive
  - Most content is static layout
  - **Conversion complexity:** Low (will wrap DecodeText with client:only)

- **Button.tsx** → `Button.astro`
  - Conditional rendering for `<a>` vs `<button>` based on props
  - Optional onClick handler - can use form submission or href navigation
  - **Conversion complexity:** Trivial

#### Link & Navigation Components (3)
- **AtomLink.tsx** → `AtomLink.astro`
  - RSS feed link with icon
  - Pure presentational, no interactivity
  - **Conversion complexity:** Trivial

- **ExternalLink.tsx** → `ExternalLink.astro`
  - Wrapper for external links with target="_blank" and rel attributes
  - Pure presentational
  - **Conversion complexity:** Trivial

- **Footer.tsx** → `Footer.astro`
  - Static footer with links and copyright
  - Pure presentational
  - **Conversion complexity:** Trivial

#### Visual Components (2)
- **DitherTriangle.tsx** → `DitherTriangle.astro`
  - SVG decoration component
  - Pure presentational
  - **Conversion complexity:** Trivial

- **JobItem.tsx** → `JobItem.astro`
  - Renders single job list item
  - Pure presentational, no state or hooks
  - **Conversion complexity:** Trivial

#### Static Layout Sections (3)
- **PageHeader.tsx** (partial) → `PageHeader.astro` (split)
  - Contains navigation with `NavItem` sub-component
  - Uses `useEffect` to detect active route - can use Astro utilities
  - **Issue:** Has React state for active navigation detection
  - **Solution:** Use Astro.url to determine active page at build time
  - **Conversion complexity:** Low

---

### ⚠️ MEDIUM PRIORITY - Interactive Components (4)

These require **client-side interactivity** but can be optimized:

#### Theme Toggle (1)
- **ThemeToggle.tsx** → Keep as React OR convert to vanilla JS
  - Uses `useThemeToggle` hook
  - Needs to respond to user clicks
  - **Option A:** Keep as `client:idle` React component (minimal JS)
  - **Option B:** Convert to Astro with inline script (zero React overhead)
  - **Recommendation:** Convert to Astro + inline script for better performance
  - **Conversion complexity:** Low

#### Form & State Management (3)
- **DraftToggle.tsx** → Keep as React with `client:load` OR convert
  - Development-only toggle using localStorage
  - Dispatches custom events to sibling components
  - **Option A:** Keep lightweight React
  - **Option B:** Convert to Astro with inline script
  - **Recommendation:** Lightweight approach - leave as `client:idle` React
  - **Conversion complexity:** Low (if keeping as React)

- **HomepageBlog.tsx** → Needs refinement
  - Filters posts based on draft toggle state
  - Listens to custom event from DraftToggle
  - Could be split: static blog list + interactive filter logic
  - **Option A:** Keep as `client:idle` for draft filtering
  - **Option B:** Use view transitions to load different content (no JS)
  - **Recommendation:** Keep as is OR refactor to use URL query parameter + server-side filtering
  - **Conversion complexity:** Medium

- **Progress.tsx** → Keep as React
  - Manages animated progress bar with refs and state
  - Requires continuous animation updates
  - **Status:** Essential interactivity, keep as is
  - **Conversion complexity:** High (not recommended)

---

### 🚫 CRITICAL - Complex Animated Components (1)

#### DecodeText.tsx
- **Status:** Keep as React (client-side animation required)
- Advanced animation component with:
  - SeededRandom PRNG for deterministic animation
  - useEffect-driven animation loops
  - requestAnimationFrame for smooth 60fps
  - Character-by-character reveal with shuffle
- **Optimization:** Already optimal - uses `client:load` appropriately
- **Conversion complexity:** Not feasible

---

## Refactoring Strategy

### Phase 1: Setup (Preparation)
1. Create new Astro component equivalents alongside React versions
2. Update import statements in parent components to use Astro versions
3. Run tests/builds to ensure compatibility
4. Gradually migrate dependencies

### Phase 2: Trivial Conversions (18 components, ~1-2 days)
Convert these in bulk - they require minimal changes:
- All Typography utilities (H1, H2, H3, Text, etc.)
- All Link components (ExternalLink, AtomLink)
- All Static layout components (Footer, DitherTriangle)
- Visual/Presentational items (ByLine, BlogPostPreview, JobItem, Button)

**Process per component:**
1. Create `ComponentName.astro` from `ComponentName.tsx`
2. Convert JSX to Astro template syntax
3. Move classNames/styling to Astro script section
4. Test in pages where component is used
5. Remove React version

### Phase 3: Layout Wrapper Conversion (3 components, ~1 day)
- Page.astro - handles footer inclusion
- BlogPage.astro - preserves DecodeText as client:only
- BackButton.astro - replaces onClick with inline script

### Phase 4: Navigation Optimization (1 component, ~1-2 days)
- **PageHeader.tsx** → **PageHeader.astro**
  - Remove useEffect route detection
  - Use `Astro.url.pathname` for active link detection
  - Convert NavItem to sub-component or inline
  - Keep ThemeToggle as client:load within PageHeader

### Phase 5: Optional - Interactive Components (2 components, ~2-3 days)
- **ThemeToggle.tsx** → **ThemeToggle.astro** (with inline script)
  - Eliminates React dependency for simple toggle
  - Better performance, smaller bundle
  
- **DraftToggle.tsx** (optional)
  - Can stay as React (simple component)
  - OR convert if pursuing zero-React goal
  - Performance gain: minimal, so deprioritize

### Phase 6: HomepageBlog Refactoring (1 component, ~2 days)
- **Option A (Recommended):** Refactor to use URL query params
  - `?drafts=true` parameter
  - Server-render filtered post list
  - DraftToggle updates URL
  - Eliminates client-side filtering
  
- **Option B:** Keep as lightweight React with optimization
  - Use `client:idle` directive
  - Keep filter logic minimal

---

## Expected Impact

### Bundle Size Reduction
- **Removing React components:** ~20-25KB gzipped reduction
- **Current estimate:** React bundle ~40KB, removing 50% = ~20KB savings

### Performance Improvements
- Faster initial page load
- Reduced time to interactive
- Better Lighthouse scores
- Less JavaScript to parse/execute

### Maintainability
- Easier to reason about static layouts
- Clearer separation: animation/interactivity (React) vs layout/presentation (Astro)
- Fewer dependencies in view layer
- Better future-proofing with Astro

---

## Component Dependency Map

```
PageHeader.astro (contains)
├── ThemeToggle.tsx (client:load) [KEEP OR CONVERT]
└── NavItem logic (inline in Astro)

BaseLayout.astro (contains)
├── PageHeader (as above)
└── slot

Page.astro (replaces Page.tsx, contains)
└── Footer.astro

BlogPage.astro (replaces BlogPage.tsx, contains)
├── BackButton.astro
├── ByLine.astro
├── DecodeText.tsx (client:load) [KEEP]
└── AtomLink.astro

Footer.astro (contains)
└── ExternalLink.astro (multiple)

HomepageBlog (client:load) [KEEP OR REFACTOR]
├── BlogPostPreview.astro (mapped)

index.astro (contains)
├── Page.astro
├── DecodeText.tsx (client:load)
├── DraftToggle.tsx (client:load)
└── HomepageBlog.tsx (client:load)

blog/[slug].astro (contains)
├── BlogPage.astro
└── (blog content)

work.astro (contains)
├── Page.astro
├── H1.astro
├── Text.astro
├── DecodeText.tsx (client:load)
```

---

## Migration Checklist

- [ ] **Phase 1:** Create new Astro versions of Typography components
- [ ] **Phase 1:** Create ExternalLink.astro, AtomLink.astro
- [ ] **Phase 2:** Convert ByLine.astro, BlogPostPreview.astro, JobItem.astro
- [ ] **Phase 2:** Convert DitherTriangle.astro, Button.astro
- [ ] **Phase 3:** Convert Page.astro, BackButton.astro
- [ ] **Phase 3:** Update BlogPage.astro with DecodeText client:load
- [ ] **Phase 4:** Refactor PageHeader.astro
- [ ] **Phase 5:** (Optional) Convert ThemeToggle to Astro
- [ ] **Phase 5:** (Optional) Convert DraftToggle to Astro
- [ ] **Phase 6:** (Optional) Refactor HomepageBlog
- [ ] Remove all unused React component files
- [ ] Update index.tsx exports to remove React-only exports
- [ ] Run full test suite
- [ ] Verify bundle size improvements
- [ ] Check Lighthouse metrics

---

## Estimated Timeline

| Phase | Complexity | Time | Priority |
|-------|-----------|------|----------|
| Phase 1 | ⭐ Very Low | 1 day | HIGH |
| Phase 2 | ⭐ Very Low | 0.5-1 day | HIGH |
| Phase 3 | ⭐⭐ Low | 1 day | HIGH |
| Phase 4 | ⭐⭐ Low | 1-2 days | HIGH |
| Phase 5 | ⭐⭐ Low | 1-2 days | MEDIUM |
| Phase 6 | ⭐⭐⭐ Medium | 1-2 days | MEDIUM |

**Total estimated effort:** 5-8 days for complete refactor (including testing)

---

## Components to Keep as React

1. **DecodeText.tsx** - Complex animation with requestAnimationFrame (used 8 times)
2. **SocialCard.tsx** - OG image generation for open-graph.astro (used 1 time with client:only="react")

**Total React components after refactor:** 2 (down from 28 = 93% reduction)

### Recommended Cleanup
Also remove these 3 unused components:
- Button.tsx (0 uses)
- JobItem.tsx (0 uses) 
- Progress.tsx (0 uses)

---

## Notes

- The site already has excellent Astro setup with `BaseLayout.astro` and proper page organization
- DecodeText is well-optimized with proper cleanup and no hydration issues
- DraftToggle is dev-only, so its performance impact is negligible
- ThemeToggle can benefit most from conversion (simple toggle, repeated on every page)
- HomepageBlog refactoring is optional but recommended for cleanest architecture
