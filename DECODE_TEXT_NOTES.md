# DecodeText Component: Design & Trade-Offs

## Overview

`DecodeText` is a React 18 + TypeScript component that animates text with a "matrix-rain" decode effect. Characters shuffle with random noise, then progressively lock left-to-right into the target string. It's production-ready, SSR-safe, and fully accessible.

## Core Design Decisions

### 1. **PRNG Implementation: xorshift32**

**Choice:** Custom seeded PRNG using xorshift32 algorithm.

**Why:**
- **Determinism:** Same seed → identical shuffle sequence. Enables reproducible animations for testing/demonstration.
- **Performance:** ~1 operation per random number (faster than Math.random + seed libraries).
- **No dependencies:** Zero external libraries. Lightweight (~40 LOC).
- **Good distribution:** Adequate for character selection; not cryptographically strong (unnecessary here).

**Trade-off:** xorshift32 has some subtle biases in lower bits, but negligible for visual purposes. For higher quality, consider xorshift128+ or PCG, but adds complexity.

```typescript
// Example: seed=42 always produces identical animation
<DecodeText value="Hello" seed={42} />
```

### 2. **SSR Safety & Hydration**

**Problem:** Server-side rendering HTML must match client-side hydration, or React throws warnings and breaks interactivity.

**Solution:** 
- Initial render shows **all characters locked** (target string fully visible).
- Animation starts **only in useEffect** (client-side only).
- Server renders static HTML; client attaches event listeners without changing DOM.

**Why this works:**
```
Server: renders "Hello" (all locked)
      ↓
Client: hydrates "Hello" (matches server)
      ↓
useEffect: unlocks chars, starts shuffle/reveal loops
```

**Alternative (rejected):**
- Delay rendering until `useLayoutEffect`: Avoids hydration mismatch but causes first-paint delay.
- Ignore mismatches: Poor user experience + console errors.

### 3. **Performance: requestAnimationFrame + setInterval**

**Choice:**
- **Shuffle loop:** `requestAnimationFrame` (smooth 60fps animation)
- **Reveal loop:** `setInterval` (discrete character-locking steps)

**Why:**
- RAF syncs with browser repaints (no wasted frames, smooth visuals).
- setInterval for reveal is cleaner; we don't need sub-frame granularity.
- Both properly cleaned up on unmount/pause.

**Trade-off:** 
- Could use one RAF loop for both, but adds complexity managing frame timing.
- Could use Web Workers for PRNG, but overkill for single-threaded animation.

**Cleanup:**
```typescript
useEffect(() => {
  // ...
  return () => {
    if (shuffleTimerRef.current) cancelAnimationFrame(shuffleTimerRef.current);
    if (revealTimerRef.current) clearInterval(revealTimerRef.current);
  };
}, [...deps]);
```

### 4. **Accessibility: aria-label + Semantic HTML**

**Choice:** Expose final text via `aria-label` on `<span role="status">`.

**Why:**
- Screen readers announce the target value (what the animation will reach).
- No canvas (fully semantic, selectable text).
- `role="status"` indicates content updates (good for ARIA live regions).
- Each character is a separate `<span>` with `data-locked` (enables CSS styling/transitions).

**Why not:**
- Hidden aria-live region: Redundant; aria-label is simpler.
- Canvas: Inaccessible to screen readers; breaks searchability.

### 5. **Prop Changes: Reset vs. Preserve State**

**Behavior:**
- **`value` changes:** Reset animation, restart from scratch.
- **`running` toggle:** Pause/resume without losing state.
- **`seed` changes:** Reinitialize PRNG (new animation sequence).

**Implementation:**
```typescript
useEffect(() => {
  // Reset when value/seed change
  setDisplay(value);
  setLockedIndices(new Set(...));
  nextRevealIndexRef.current = 0;
}, [value, seed]);

useEffect(() => {
  // Pause/resume preserves state
  if (running) startShuffling();
  else cancelAnimationFrame(shuffleTimerRef.current);
}, [running]);
```

### 6. **State Management: Refs for Closure Scope**

**Problem:** Closures in RAF/setInterval can't access updated state.

**Solution:** 
```typescript
const displayRef = useRef<string>(value);
useEffect(() => {
  displayRef.current = display; // Sync ref when state changes
}, [display]);

const shuffle = () => {
  const chars = displayRef.current.split(''); // Always fresh
  // ...
};
```

**Why not:** Direct state access in closures captures old values.

---

## Configuration

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `value` | string | — | Target text to animate into. |
| `running` | boolean | `true` | Pause/resume animation. |
| `seed` | number | `undefined` | For deterministic sequences. If undefined, uses timestamp. |
| `shuffleInterval` | number | `30` | ms between shuffle frames. Lower = faster flicker. |
| `revealInterval` | number | `80` | ms between revealing each character. |
| `pool` | string | A-Z, a-z, 0-9, symbols | Character set for noise. |
| `onComplete` | () => void | — | Fired when all chars locked. |
| `className` | string | `''` | CSS class for outer `<span>`. |

---

## Behavior on Prop Changes

### value changes
```tsx
<DecodeText value="Hello" />
<DecodeText value="World" /> // ← Resets animation, animates "World"
```

### running toggle
```tsx
<DecodeText value="Hello" running={true} />
<DecodeText value="Hello" running={false} /> // ← Pauses (state preserved)
<DecodeText value="Hello" running={true} /> // ← Resumes from pause point
```

### seed changes
```tsx
<DecodeText value="Hello" seed={42} />
<DecodeText value="Hello" seed={99} /> // ← New PRNG, new shuffle sequence
```

---

## Accessibility Features

1. **aria-label**: Exposes final target text to screen readers.
2. **role="status"**: Indicates dynamic content updates.
3. **Semantic HTML**: Each char is a `<span>`, fully selectable and copy-able.
4. **No canvas**: Searchable, no accessibility barrier.

**Example:**
```html
<span aria-label="Nick Radford" role="status">
  <span data-locked="true">N</span>
  <span data-locked="true">i</span>
  <!-- ... -->
</span>
```

Screen reader announces: "Nick Radford" (immediately, without waiting for animation).

---

## Testing Strategy

### Unit Tests Included

1. **PRNG Determinism:** Same seed produces identical outputs.
2. **Reveal Order:** Verify left-to-right locking.
3. **Prop Changes:** Value reset, pause/resume, seed changes.
4. **SSR Safety:** Initial render is all locked (prevents hydration mismatch).
5. **Callbacks:** onComplete fires when animation finishes.
6. **Accessibility:** aria-label and semantic structure.
7. **Performance:** Timer cleanup, no memory leaks.

### E2E Testing Tips

- Use Cypress/Playwright to visually verify animation.
- Snapshot test final state (after onComplete).
- Test pause/resume interaction in browser DevTools.

---

## Performance Characteristics

| Metric | Behavior |
|--------|----------|
| **Re-renders** | `O(value.length)` per shuffle frame (batched via `setDisplay`). |
| **Memory** | Constant (PRNG state + ref objects). No accumulation. |
| **Timer cleanup** | Automatic on unmount and prop changes. No leaks. |
| **60fps target** | Achieved via requestAnimationFrame (shuffle). |

**Optimization:** React batches state updates; multiple `setDisplay` calls within one RAF frame coalesce into one render.

---

## Optional Variants / Extensions

### 1. **Random Reveal Order**
Instead of left-to-right, unlock characters in random order:

```typescript
// In component:
const [shuffledIndices, setShuffledIndices] = useState(
  () => [...Array(value.length).keys()].sort(() => prng.next() - 0.5)
);

// In reveal loop:
const nextIdx = shuffledIndices[nextRevealIndexRef.current];
newLocked.add(nextIdx);
```

### 2. **Custom Animation Easing**
Add easing functions (ease-in, ease-out) to reveal speed:

```typescript
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
const easedInterval = revealInterval * easeOutQuad(progress);
```

### 3. **Per-Character Callbacks**
Fire a callback when each character locks:

```typescript
const onCharacterReveal?: (char: string, index: number) => void;
```

### 4. **Custom Transition Animations**
Use CSS transitions on `data-locked` for smooth color/opacity changes:

```css
span[data-locked="false"] {
  color: rgba(0, 255, 0, 0.5);
  transition: color 0.3s ease-out;
}

span[data-locked="true"] {
  color: rgba(0, 255, 0, 1);
}
```

---

## Known Limitations & Workarounds

| Limitation | Impact | Workaround |
|------------|--------|-----------|
| PRNG lacks cryptographic strength | None (not needed for animation). | Use Web Crypto for other purposes. |
| No sub-frame reveal timing | Can't "stagger" reveals mid-frame. | Increase revealInterval for perceived smoothness. |
| No canvas support | Limited advanced effects. | Render multiple DecodeText instances. |
| SSR hydration constraints | Animation must start post-render. | By design; not a limitation. |

---

## Code Size & Bundle Impact

- **Component:** ~4 KB (minified + gzipped).
- **Dependencies:** Zero (only React 18+).
- **Tree-shakeable:** Yes (all code is needed, but exports are ESM).

---

## Example: Full Usage

```tsx
import { DecodeText } from './components/DecodeText';

export default function App() {
  const [text, setText] = useState('Welcome');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      <DecodeText
        value={text}
        running={!isPaused}
        seed={12345}
        shuffleInterval={30}
        revealInterval={80}
        pool="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
        onComplete={() => console.log('Animation done!')}
        className="matrix-text"
      />
      <button onClick={() => setText('Hello')}>Change Text</button>
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
}
```

---

## Summary

**DecodeText** balances aesthetics, performance, and robustness:

✅ **Production-ready:** Tested, typed, accessible.  
✅ **SSR-safe:** No hydration mismatches.  
✅ **Deterministic:** Seeded PRNG for reproducibility.  
✅ **Performant:** RAF + setInterval, minimal re-renders.  
✅ **Accessible:** aria-label, semantic HTML.  
✅ **Zero dependencies:** Only React 18+.
