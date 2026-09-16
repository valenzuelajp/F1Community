# 3D Cinematic Login Experience: Design & Implementation Plan

> **Status**: ⏳ Not Implemented (as of 2026-09-16). The shipped login page (`src/app/login/page.tsx`) is a static F1 Philippines split-pane layout - no Three.js/3D canvas yet. Plan kept for future execution; re-prioritize after Phase 0 cleanup (registration + DB auth).

## Vision
Transform the **F1 Platform Login Page** into a world-class, immersive **3D cinematic experience** combining cutting-edge WebGL graphics, dynamic camera movements, and Formula 1 aesthetics.

---

## Core Features & Concepts

### 1. Interactive 3D F1 Car / Helmet Canvas
- **Technology**: Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`) or Spline 3D Runtime.
- **Dynamic Interaction**:
  - **Mouse Parallax**: 3D car/helmet subtly angles and responds to the user's cursor position.
  - **Platform Switcher Camera Transition**:
    - Switching to **F1 Website** moves the camera to a dynamic front aerodynamic angle.
    - Switching to **F1 Store** moves the camera to a side profile showcasing team liveries and official merchandise textures.
  - **Idle Animations**: Subtle floating, engine heat distortion, and tire smoke/glow effects.

### 2. High-Speed Neon Speed Trails & Particle System
- **Speed Lines**: Animated neon streak particles zooming along track paths in the background to simulate high-speed racing telemetry.
- **Lighting & Shadows**: Dynamic point lights reflecting off metallic carbon fiber bodywork, gloss paint, and glowing headlights.

### 3. Glassmorphic UI Overlay & Micro-Interactions
- **Floating Glassmorphic Card**: Transparent HUD (Heads-Up Display) style login panel floating over the 3D race canvas.
- **Auth Trigger Transitions**:
  - On submit / authentication success: 3D camera accelerates into warp-speed or cockpit zoom as the user transitions to the dashboard/store.
  - Interactive input focus: Subtle lighting pulse toward the 3D car corresponding to input focus states.

---

## Technical Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **3D Rendering** | Three.js + React Three Fiber (`@react-three/fiber`) | WebGL canvas & scene rendering in React |
| **3D Helpers** | `@react-three/drei` | Pre-built cameras, lighting, loaders, and environments |
| **Animation** | Framer Motion / GSAP | UI transitions, spring animations, and camera timelines |
| **Shaders & Particles** | GLSL / Three.js Points | Speed trails, telemetry particles, and carbon reflections |
| **Fallbacks** | CSS 3D Transforms / Static Posters | Fast-loading placeholder for low-power mobile devices |

---

## Phased Implementation Steps for Next Session

### Phase 1: 3D Canvas & Scene Foundation
- [ ] Install 3D packages: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`.
- [ ] Create `src/components/3d/CanvasContainer.tsx` with responsive canvas resizing and error boundaries.
- [ ] Set up basic scene environment: perspective camera, ambient light, directional spotlight, and dark race track floor.

### Phase 2: 3D Model & Interactive Parallax
- [ ] Import optimized low-poly 3D F1 car / race helmet model (`.gltf` / `.glb`).
- [ ] Implement mouse-movement tracking (`useFrame` hook) to smoothly interpolate camera and model orientation.
- [ ] Add team color customization (Ferrari Red `#DC143C`, Mercedes Cyan `#00D2BE`, Red Bull Navy `#1E41FF`).

### Phase 3: Particle Speed Trails & Lighting Effects
- [ ] Build high-speed particle stream representing race track apex lines.
- [ ] Add post-processing bloom effects (glow on car tail lights and neon speed streaks).

### Phase 4: UI Integration & Cinematic Transitions
- [ ] Overlay the existing glassmorphic login form (`LoginForm.tsx`, `AuthHeader.tsx`) cleanly on top of the 3D scene.
- [ ] Connect platform switcher tabs (`f1` vs. `store`) to trigger camera angle transitions.
- [ ] Add login success launch animation (camera zoom through the finish line).
- [ ] Optimize performance (lazy loading, progressive level of detail, mobile fallback).

---

*Plan created: 2026-08-29 | Target execution: Next Session*
