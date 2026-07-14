# TalwinderCSS Showcase & Interactive Sandbox Site

This repository contains the production-quality marketing, interactive playground, and documentation website built for **TalwinderCSS** (npm: `talwinder-ji-ki-css`). 

TalwinderCSS is a homemade, client-side, single-scan CSS utility engine that parses Hindi-inspired style tokens in your markup (e.g., `bg-laal-500`, `chaiPad-p-4`, `likhawat-4xl`) and compiles atomic CSS rules on the fly directly inside the browser.

<!-- add a screenshot/gif of the playground here -->

---

## 🛠️ Technology Stack

The application is built using a modern, performant, and premium frontend stack:
- **Core Framework**: React 19 & Vite 8
- **Routing**: TanStack Router (Code-based routing configurations)
- **Styling Architecture**: 
  - **TalwinderCSS** (`talwinder-ji-ki-css@1.0.4`) for all demonstrated preview contents and documentation example blocks.
  - **Tailwind CSS v4** for high-level site chrome structure, navigation headers, sidebar drawers, footer layout, and container alignment.
- **3D Graphics**: React Three Fiber & Three.js (interactive low-poly floating shapes colored with Talwinder's color palette).
- **Animations**: Framer Motion (for smooth property crossfades, layout transitions, and workspace interactions).
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js (v18+)
- npm or bun

### 🔧 Installation
From the `frontend` directory, install the dependencies:
```bash
npm install
```

### 💻 Local Development
Start the local development server:
```bash
npm run dev
```

### 🏗️ Build for Production
Verify typescript compilation and build the static optimized assets bundle:
```bash
npm run build
```
Verify the production bundle using the local preview server:
```bash
npm run preview
```

---

## 📂 Project Structure

```text
frontend/
├── src/
│   ├── assets/       # Static media assets (logos, svg icons)
│   ├── lib/
│   │   └── useTalwinder.ts  # React hook orchestrating runTalwinder() scan updates
│   ├── routes/
│   │   ├── Home.tsx         # Landing Hero view with R3F Canvas and swatches
│   │   ├── Playground.tsx   # Live Sandbox box generator & comparison workspace
│   │   └── Docs.tsx         # Responsive Sidebar search & doc sections
│   ├── router.tsx    # TanStack code-based route definition tree
│   ├── main.tsx      # StrictMode bootstrapping & RouterProvider mount
│   ├── index.css     # Dark-mode variables, fonts (Outfit/JetBrains Mono)
│   └── talwinder.d.ts# TypeScript declarations for the talwinder-ji-ki-css module
├── index.html        # Main template index (configured for SEO metadata)
├── package.json      # Dependencies config (React 19, Router, R3F, Framer Motion)
└── tsconfig.json     # TypeScript settings
```

---

## 💡 How TalwinderCSS Integration Works

The engine executes a synchronous scan of the DOM and injects stylesheets dynamically:
```ts
import { runTalwinder } from "talwinder-ji-ki-css";
runTalwinder();
```

Because it does not utilize a MutationObserver, dynamic React state changes that render new utility classes will initially appear unstyled. To resolve this, this project implements a custom `useTalwinder(deps)` hook inside [useTalwinder.ts](file:///d:/PROGRAMMING/WEB%20DEVELOPMENT/JS/js/TalwinderCSS/frontend/src/lib/useTalwinder.ts):

```ts
import { useEffect } from "react";
import { runTalwinder } from "talwinder-ji-ki-css";

export function useTalwinder(deps: React.DependencyList = []) {
  useEffect(() => {
    try {
      runTalwinder();
    } catch (e) {
      console.error("TalwinderCSS scan error:", e);
    }
  }, deps);
}
```

This hook is triggered:
1. At the **Root Layout Level** in [router.tsx](file:///d:/PROGRAMMING/WEB%20DEVELOPMENT/JS/js/TalwinderCSS/frontend/src/router.tsx) bound to the `location.pathname` dependency, scanning for newly navigated views on route changes.
2. At the **Playground Workspace Level** bound to changes in active box settings, compiling and injecting rules for newly constructed class combinations within a frame.

---

## 🔗 Reference Links
- **Engine Repository**: [MEHULARORA11/My-Custom-Tailwind](https://github.com/MEHULARORA11/My-Custom-Tailwind)
- **NPM Package Registry**: [talwinder-ji-ki-css on npm](https://www.npmjs.com/package/talwinder-ji-ki-css)
