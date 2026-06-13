# UI Components Reference

## Installed npm Packages (in package.json)

| Package | Version | Source | Purpose |
|---------|---------|--------|---------|
| `border-beam` | latest | cult-ui.com | Animated border beam effect for buttons |
| `gsap` | latest | GreenSock | ClickSpark particle animation engine |
| `motion` | ^12.11.4 | motion.dev | CountUp spring animation (already present) |

## React Bits Components (src/reactbits/)

Installed via `npx reactbits-installer` — 120+ components available in `src/reactbits/`.
All are TypeScript + CSS variants.

### Integrated Components

| Component | File | Used In | Description |
|-----------|------|---------|-------------|
| **Aurora** | `src/reactbits/Aurora.tsx` | App.jsx | Canvas-based animated gradient blobs, positioned behind all content. Pure canvas (no WebGL). |
| **ClickSpark** | `src/reactbits/ClickSpark.tsx` | App.jsx (wraps root) | GSAP-powered particle burst on every click. 8 sparks, cyan color. |
| **CountUp** | `src/reactbits/CountUp.tsx` | AnimatedValue.jsx (re-export) | Spring-animated number counter using motion/react. Replaces the old RAF-based AnimatedValue. |
| **SpotlightCard** | `src/reactbits/SpotlightCard.tsx` | Dashboard.jsx (cards) | Mouse-following radial gradient spotlight. Adapted to use a child div + CSS rather than overwriting background. |

### Usage Patterns

```jsx
// Aurora — add as absolute canvas in a relative container
<Aurora colorStops={["#00d4ff", "#8b5cf6", "#06b6d4", "#00ff99"]} speed={3} blur={120}/>

// ClickSpark — wrap app root
<ClickSpark sparkColor="#00d4ff" sparks={8} sparkSize={6}>
  <AppContent/>
</ClickSpark>

// CountUp — animated number from-to
<CountUp to={value} from={0} duration={1.2}/>

// SpotlightCard — wrap any card for mouse glow
<SpotlightCard className="card" spotlightColor="rgba(59,130,246,0.05)">
  card content
</SpotlightCard>
```

## CSS-only Patterns (in App.css)

| Pattern | CSS Location | Description |
|---------|-------------|-------------|
| Grid Beam | `.main-area::before/::after` | 64px repeating grid lines + animated sweep beam |
| Gradient Heading | `.page-title` | `background-clip: text` gradient from white to blue |
| Texture Card | `.card`, `.kpi-card` | Multilayer box-shadow (inset + hard bottom + soft depth) |
| Border Beam | (via npm `border-beam` component) | Conic-gradient animated border |

## Note for Future Sessions
- React Bits components are `.tsx` — Vite handles them transparently via `@vitejs/plugin-react`.
- To add more: `npx reactbits-installer` re-installs all 120, or copy individual files from node_modules/reactbits-installer.
- Do NOT reinstall packages — they're already in package.json.
