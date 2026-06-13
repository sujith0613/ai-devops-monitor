# AI DevOps Monitor — Agent Guide

## Stack
- Frontend: React + Vite + motion/react + vanilla CSS
- Backend: FastAPI + psutil + WebSockets (port 8000)
- AI: Ollama local LLM (port 11434)

## Frontend Setup
- Work dir: `frontend/`
- Dev: `npm run dev` (broken: `#` in path breaks Vite 8)
- Preview: `npm run build && cd dist && npx serve` (port 3000)
- Detached serve: `Start-Job { Set-Location "frontend/dist"; npx serve }`

## Installed Packages — DO NOT REINSTALL
All already in `frontend/package.json`:
- `@phosphor-icons/react` — icon library
- `motion` — motion/react animation library
- `border-beam` — animated border effect (cult-ui)
- `gsap` — animation engine for ClickSpark
- `reactbits-installer` — 120+ animated components (dev only)

## UI Components Available (see UI_COMPONENTS.md)
| Import | Source | Purpose |
|--------|--------|---------|
| `Aurora` | `src/reactbits/Aurora.tsx` | Animated aurora background |
| `ClickSpark` | `src/reactbits/ClickSpark.tsx` | Click particle burst |
| `CountUp` | `src/reactbits/CountUp.tsx` | Animated number counter |
| `SpotlightCard` | `src/reactbits/SpotlightCard.tsx` | Mouse-following card glow |
| `BorderBeam` | `border-beam` package | Animated border on buttons |
| `BeamButton` | `src/components/BeamButton.jsx` | Pre-configured BorderBeam button |

## CSS Architecture
- `src/index.css` — CSS custom properties (glass tokens, colors, spacing)
- `src/App.css` — all component styles (grid beam, cards, buttons, animations)
- No Tailwind — vanilla CSS only

## Build Notes
- Build output: `dist/assets/index-*.css` (~26KB) and `index-*.js` (~561KB)
- Build cleanly passes — no lint/typecheck step configured
- `npx reactbits-installer` copies all 120 components to `src/reactbits/`
