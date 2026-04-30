# Porsche 911 GT3 RS — Premium Scrollytelling Microsite

A high-end, interactive product showcase for the Porsche 911 GT3 RS, built with modern web technologies and designed for premium user experiences. This scrollytelling microsite features a scrubbable 360° canvas sequence, glass-morphism UI components, smooth motion transitions, and a fully responsive mobile-first layout.

---

## 🚀 Project Overview

This is a **Next.js 14** powered scrollytelling experience that combines:
- **Canvas-driven frame scrubbing**: A 192-frame 360° product sequence that responds to scroll position
- **Premium UI design**: Glass-card components with backdrop blur, gradient accents, and smooth hover effects
- **Fluid animations**: Framer Motion transitions for section reveals and scroll-driven camera zoom
- **Mobile-optimized**: Full responsive support with dedicated mobile canvas scaling and two-column card layouts
- **Loading experience**: 10-second intro splash with animated logo and pulsing progress bar

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom globals.css
- **Animations**: Framer Motion
- **Canvas**: HTML5 Canvas 2D for frame rendering with DPR-awareness
- **Fonts**: Oswald (display), Inter/Space Mono (body/mono)

---

## 📁 Project Structure

```
sequence/
├── app/
│   ├── layout.tsx           # Root layout with Tailwind/fonts
│   └── page.tsx             # Main page with splash, sections, and scroll handling
├── components/
│   ├── ScrollyCanvas.tsx    # Canvas renderer (192 frames, DPR-aware, mobile contain-fit)
│   ├── IntroSplash.tsx      # 10-second loading splash with pulsing progress bar
│   ├── Overlay.tsx          # Hero title and top-right logo with scroll-driven opacity
│   ├── ModelVariants.tsx    # Four-column spec grid (responsive to mobile 2-col)
│   ├── PerformanceMetrics.tsx # 6-card performance stats with image slots
│   ├── HeritageLegacy.tsx   # Brand heritage narrative section
│   ├── TechnicalSpecs.tsx   # Technical specifications table
│   ├── SpecHUD.tsx          # Bottom-right status display
│   ├── CTASection.tsx       # Call-to-action section
│   └── Navbar.tsx           # (Present but not used in layout)
├── public/
│   ├── sequence/            # Frame images (frame_000.webp → frame_191.webp)
│   ├── porsche.png          # Logo (used in splash and overlay)
│   ├── speed.png, accel.png, etc. # Performance card images
│   └── ...
├── styles/
│   └── globals.css          # Global tokens, glass-card styles, responsive rules
├── tailwind.config.cjs
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- The 192-frame sequence in `/public/sequence/` (WebP format recommended)

### Installation & Running

```bash
# Install dependencies
npm install

# Start the dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📦 Key Components & Features

### ScrollyCanvas
- Renders a scrubbable 360° product sequence responsive to page scroll
- **192 frames** by default (configurable via `frameCount` prop)
- DPR-aware (handles high-density displays correctly)
- **Mobile behavior**: uses `contain` scaling on screens < 768px to preserve car visibility
- **Desktop behavior**: uses `cover` scaling for cinematic cropping
- Includes lightweight motion-blur effect for smooth scrubbing
- Supports keyboard navigation (arrow keys) for manual frame stepping

**Props:**
- `frameCount?: number` — Number of frames (default: 192)
- `basePath?: string` — Path to frame images (default: '/sequence/frame_')
- `containerRef?: React.RefObject<HTMLElement>` — Optional ref for container

### IntroSplash
- **10-second** animated loading screen
- Features Porsche logo with entrance animation
- **Animated progress bar** with:
  - Linear fill animation synced to 10-second duration
  - Pulsing background layer
  - Scanning highlight sweep for dynamic feel
  - Red-to-white gradient with glow effect

### Overlay
- **Hero title** with "911 GT3 RS" text (white + red accent)
- **Responsive positioning**: 
  - Mobile: left-aligned, top-32
  - Desktop: left-24, top-44
- **Top-right logo**: Porsche badge that scales and reposition by breakpoint
- Scroll-driven opacity for hero text fade during page scroll

### ModelVariants
- **Four spec cards** showcasing vehicle specs (Engine, Transmission, Chassis, etc.)
- Glass-card styling with hover lift effects
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- Uses TypeScript-safe motion wrappers

### PerformanceMetrics
- **Six performance cards** arranged in 2 rows of 3
- Displays key metrics (Top Speed, Acceleration, Lap Record, Power, Torque, Weight)
- Image slots for each card (e.g., `/speed.png`, `/accel.png`)
- Mobile layout: 2 columns with stacked image slots
- Desktop layout: 3-column grid with side image placements

### HeritageLegacy & TechnicalSpecs
- Narrative sections with increased font sizes for premium feel
- Full-width responsive text blocks
- Consistent glass-card and motion patterns

### SpecHUD
- Bottom-right status display with vehicle specs
- Optional visibility control based on scroll position

---

## 🎨 Design System & Theming

### Color Palette
```css
--bg: transparent
--fg: #FFFFFF
--accent: #CC0000 (Porsche Red)
--accent-light: #FF3333
--muted: #FFFFFF
```

### Typography
- **Display**: Oswald (700 weight, 6.5rem–text-display-lg)
- **Body**: Inter / system fonts (400 weight, 1rem default)
- **Mono**: Space Mono (0.75rem for labels/units)

### Glass-Card Styles
- Semi-transparent background with backdrop blur
- Subtle border and shadow for depth
- Smooth hover lift (+8px transform, enhanced shadow)
- Used across ModelVariants, PerformanceMetrics, HeritageLegacy

---

## 📱 Responsive Design

### Breakpoints & Behavior

| Screen Size | Canvas | Cards | Hero |
|---|---|---|---|
| **Mobile** (<768px) | `contain` fit, 8% y-offset, 1.08x zoom | 2 columns, stacked | left-4, top-32, smaller font |
| **Tablet** (768–1024px) | `contain` fit | 2–3 columns | left-1/2, centered |
| **Desktop** (>1024px) | `cover` fit | 3–4 columns | left-24, positioned |

### Mobile Optimizations
- Canvas zoom factor: 1.08× for closer view of car
- Black background on body for better contrast
- Reduced vignette/lighting overlays on phone
- Performance card image slots repositioned to static (bottom of card)
- Two-column perf grid instead of 3

---

## 🔧 Customization Guide

### Change the Frame Sequence
Replace the 192 WebP files in `/public/sequence/`:
```bash
# Place images as:
# /public/sequence/frame_000.webp
# /public/sequence/frame_001.webp
# ... (up to frame_191.webp for 192 frames)
```

### Adjust Intro Splash Duration
Edit `app/page.tsx`:
```javascript
const t = setTimeout(()=> setShowIntro(false), 10000) // 10000ms = 10 seconds
<IntroSplash key="intro" durationMs={10000} />
```

### Customize Colors
Edit `styles/globals.css`:
```css
:root {
  --accent: #CC0000;          /* Porsche Red */
  --accent-light: #FF3333;    /* Light Red */
}
```

### Modify Hero Title
Edit `components/Overlay.tsx`:
```jsx
<h1 className="font-display text-5xl sm:text-6xl md:text-display-lg">
  <span className="hero-title-part--white">911 GT3&nbsp;</span>
  <span className="hero-title-part--red">RS</span>
</h1>
```

### Change Performance Metrics Cards
Edit `components/PerformanceMetrics.tsx` to add/remove cards or update image paths:
```jsx
// Image slots are loaded from /public/{imageName}.png
<img src="/speed.png" alt="Top Speed" className="perf-card-image" />
```

---

## 📊 Performance Considerations

- **Frame Preloading**: All 192 frames are preloaded on mount (consider lazy loading for very large sequences)
- **DPR Awareness**: Canvas automatically scales for high-DPI displays
- **Motion Reduction**: Respects `prefers-reduced-motion` media query
- **GPU Compositing**: Uses `will-change` and `transform`/`opacity` for smooth animations

---

## 🎬 Animation Details

### Scroll-Driven Effects
- **Frame scrubbing**: Scroll progress → frame index (0–191)
- **Camera zoom**: Subtle sine-wave zoom (1.0 → 1.03–1.07 depending on platform)
- **Layer parallax**: Depth layers shift subtly during scroll

### Section Transitions
- **Reveal animation**: Sections fade in and slide up as they enter viewport
- **Stagger effect**: Child elements animate with slight delays
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` for smooth, premium feel

---

## 🔗 Assets & Files Required

### Essential
- **192 WebP frames** in `/public/sequence/frame_000.webp` → `/public/sequence/frame_191.webp`
- **Logo** at `/public/porsche.png`

### Optional (Performance Cards)
- `/public/speed.png` — Top speed icon
- `/public/accel.png` — Acceleration icon
- `/public/time.png` — Lap time icon
- `/public/pwr.png` — Power icon
- `/public/torque.png` — Torque icon
- `/public/wt.png` — Weight icon

---

## 🐛 Troubleshooting

### Canvas not rendering
- Ensure frame images exist at correct paths
- Check browser console for image load errors
- Verify WebP format is supported (fallback to PNG if needed)

### Layout broken on mobile
- Clear browser cache
- Check responsive breakpoints in `styles/globals.css`
- Ensure Tailwind build includes all breakpoints (sm, md, lg, xl)

### Splash doesn't show
- Check that `IntroSplash` component is rendered in `app/page.tsx`
- Verify `/public/porsche.png` exists
- Check `AnimatePresence` mode and timing

### Performance slow
- Reduce frame preload count (edit `frameCount` prop)
- Lazy-load `ModelVariants` component (already done with `dynamic()`)
- Minimize animation complexity on mobile

---

## 📄 License & Credits

This scrollytelling microsite is built as a premium product showcase template. All Porsche branding and assets are proprietary to Porsche AG.

---

## 🤝 Development Notes

- All components use TypeScript with strict mode for type safety
- Motion wrappers are typed to avoid `framer-motion` type conflicts
- Mobile-first CSS approach: base styles then enhanced via `@media (min-width)`
- Frame sequence uses DPR-aware canvas rendering for crisp output

---

**Last Updated:** April 30, 2026  
**Maintained by:** Development Team
