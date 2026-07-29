import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, BookOpen, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useTalwinder } from '../lib/useTalwinder';

// 10 Talwinder CSS palette hex values
const PALETTE_COLORS = [
  '#ef4444', // laal (red)
  '#3b82f6', // neela (blue)
  '#22c55e', // hara (green)
  '#eab308', // peela (yellow)
  '#a855f7', // baingani (purple)
  '#ec4899', // gulabi (pink)
  '#f97316', // narangi (orange)
  '#14b8a6', // firozi (teal/cyan)
  '#6366f1', // jamuni (indigo)
  '#6b7280', // dhusar (gray)
];

const COLORS_METADATA = [
  { name: 'laal', desc: 'Red', hex: '#ef4444' },
  { name: 'neela', desc: 'Blue', hex: '#3b82f6' },
  { name: 'hara', desc: 'Green', hex: '#22c55e' },
  { name: 'peela', desc: 'Yellow', hex: '#eab308' },
  { name: 'baingani', desc: 'Purple', hex: '#a855f7' },
  { name: 'gulabi', desc: 'Pink', hex: '#ec4899' },
  { name: 'narangi', desc: 'Orange', hex: '#f97316' },
  { name: 'firozi', desc: 'Teal/Cyan', hex: '#14b8a6' },
  { name: 'jamuni', desc: 'Indigo', hex: '#6366f1' },
  { name: 'dhusar', desc: 'Gray', hex: '#6b7280' },
];

const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

// Full shade hex lookup so swatches always render correctly,
// even if the Talwinder runtime scan hasn't injected styles yet.
const SHADE_HEX: Record<string, Record<string, string>> = {
  laal:     { '50':'#fef2f2','100':'#fee2e2','200':'#fecaca','300':'#fca5a5','400':'#f87171','500':'#ef4444','600':'#dc2626','700':'#b91c1c','800':'#991b1b','900':'#7f1d1d' },
  neela:    { '50':'#eff6ff','100':'#dbeafe','200':'#bfdbfe','300':'#93c5fd','400':'#60a5fa','500':'#3b82f6','600':'#2563eb','700':'#1d4ed8','800':'#1e40af','900':'#1e3a8a' },
  hara:     { '50':'#f0fdf4','100':'#dcfce7','200':'#bbf7d0','300':'#86efac','400':'#4ade80','500':'#22c55e','600':'#16a34a','700':'#15803d','800':'#166534','900':'#14532d' },
  peela:    { '50':'#fefce8','100':'#fef9c3','200':'#fef08a','300':'#fde047','400':'#facc15','500':'#eab308','600':'#ca8a04','700':'#a16207','800':'#854d0e','900':'#713f12' },
  baingani: { '50':'#faf5ff','100':'#f3e8ff','200':'#e9d5ff','300':'#d8b4fe','400':'#c084fc','500':'#a855f7','600':'#9333ea','700':'#7e22ce','800':'#6b21a8','900':'#581c87' },
  gulabi:   { '50':'#fdf2f8','100':'#fce7f3','200':'#fbcfe8','300':'#f9a8d4','400':'#f472b6','500':'#ec4899','600':'#db2777','700':'#be185d','800':'#9d174d','900':'#831843' },
  narangi:  { '50':'#fff7ed','100':'#ffedd5','200':'#fed7aa','300':'#fdba74','400':'#fb923c','500':'#f97316','600':'#ea580c','700':'#c2410c','800':'#9a3412','900':'#7c2d12' },
  firozi:   { '50':'#f0fdfa','100':'#ccfbf1','200':'#99f6e4','300':'#5eead4','400':'#2dd4bf','500':'#14b8a6','600':'#0d9488','700':'#0f766e','800':'#115e59','900':'#134e4a' },
  jamuni:   { '50':'#eef2ff','100':'#e0e7ff','200':'#c7d2fe','300':'#a5b4fc','400':'#818cf8','500':'#6366f1','600':'#4f46e5','700':'#4338ca','800':'#3730a3','900':'#312e81' },
  dhusar:   { '50':'#f9fafb','100':'#f3f4f6','200':'#e5e7eb','300':'#d1d5db','400':'#9ca3af','500':'#6b7280','600':'#4b5563','700':'#374151','800':'#1f2937','900':'#111827' },
};

function ColorCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Wireframe Sphere */}
      <mesh>
        <dodecahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#333340" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Floating Colored Cubes representing the palette */}
      {PALETTE_COLORS.map((color, idx) => {
        const angle = (idx / PALETTE_COLORS.length) * Math.PI * 2;
        const radius = 2.4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius + Math.sin(idx + angle) * 0.3;
        const z = Math.sin(angle) * Math.cos(angle) * 0.5;
        
        return (
          <Float key={idx} speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[x, y, z]}>
              <boxGeometry args={[0.45, 0.45, 0.45]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export function Home() {
  // Mount-level scan for home page swatches
  useTalwinder();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 relative">
        {/* Blueprint grid — hero only, faint schematic texture */}
        <div className="blueprint-grid absolute inset-0 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Eyebrow — spec-sheet label, not a pill badge */}
            <div className="inline-block border-t border-[#222228] pt-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#5c5c6a]">
                Desi CSS Utility Engine
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
              Style with an{' '}
              <span className="border-b-2 border-[#ff6a3d] pb-1">
                Indian Accent
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#9a9aa8] font-light max-w-2xl leading-relaxed">
              TalwinderCSS is a homemade, single-scan CSS utility engine. It reads your DOM, parses Hindi-inspired classes like{' '}
              <code className="bg-[#121216] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-sm">bg-laal-500</code>
              {' '}and{' '}
              <code className="bg-[#121216] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-sm">chaiPad-p-4</code>
              , and generates atomic styles on the fly.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/playground"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#e8ecef] hover:bg-white active:bg-[#d0d4d8] text-[#0a0a0c] font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span>Try the Playground</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/docs/$section"
                params={{ section: 'getting-started' }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-[#222228] text-white font-medium rounded-lg transition-colors duration-200"
              >
                <BookOpen className="h-4 w-4 text-[#9a9aa8]" />
                <span>Read the Docs</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            {/* 3D Canvas element */}
            <div className="w-full max-w-[420px] aspect-square rounded-2xl border border-[#222228] bg-[#121216] overflow-hidden flex items-center justify-center relative shadow-2xl">
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/40 px-2.5 py-1 rounded-md text-[11px] text-[#5c5c6a] border border-white/5 uppercase tracking-wider">
                {/* Static square marker — not a pulsing green dot */}
                <span className="h-1.5 w-1.5 rounded-sm bg-[#34343c]" />
                <span>3D Palette Viz (R3F)</span>
              </div>
              <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} className="w-full h-full">
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-5, 5, 5]} intensity={0.5} />
                <ColorCubes />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Palette Showcase Strip */}
      <section className="border-y border-[#222228] bg-[#0c0c0f]/50 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">The 10 Color Families</h2>
            <p className="text-[#9a9aa8] text-sm">
              Rendered directly using live Talwinder CSS background classes. Hover over swatches to inspect class naming.
            </p>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {COLORS_METADATA.map((color) => (
              <div key={color.name} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border border-[#222228] bg-[#121216] p-3 rounded-lg hover:border-[#34343c] transition-all">
                <div className="md:col-span-2 text-left px-2">
                  <span className="font-semibold text-white capitalize">{color.name}</span>
                  <span className="block text-xs text-[#5c5c6a]">{color.desc}</span>
                </div>
                <div className="md:col-span-10 grid grid-cols-10 gap-1.5">
                  {SHADES.map((shade) => {
                    const bgClass = `bg-${color.name}-${shade}`;
                    const hexColor = SHADE_HEX[color.name]?.[shade];
                    return (
                      <div
                        key={shade}
                        className={`${bgClass} h-12 rounded flex flex-col items-center justify-end p-1 cursor-pointer transition-transform hover:scale-105 relative group border border-white/5`}
                        style={{ backgroundColor: hexColor }}
                      >
                        <span className="text-[9px] font-bold mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {shade}
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-[#16171d] text-white text-[10px] py-1 px-2 rounded border border-[#2e303a] whitespace-nowrap z-10 shadow-lg">
                          {bgClass}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works — Pipeline diagram */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Simple Core Mechanism</h2>
          <p className="text-[#9a9aa8] max-w-2xl mx-auto">
            TalwinderCSS is lightweight and executes entirely on the client, scanning elements and compiling styling definitions instantly.
          </p>
        </div>

        {/* Pipeline: three steps with connecting arrows */}
        <div className="relative flex flex-col md:flex-row items-start md:items-stretch gap-0">
          {/* Step 1 */}
          <div className="flex-1 border border-[#222228] bg-[#121216] rounded-xl p-8 text-left space-y-4 hover:border-[#34343c] transition-colors">
            <span className="text-xs font-mono text-[#5c5c6a] tracking-widest">01</span>
            <h3 className="text-lg font-bold text-white">Write Markup</h3>
            <p className="text-sm text-[#9a9aa8] leading-relaxed">
              Use Hindi-inspired class names on your components, such as{' '}
              <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-xs">chai-flex</code>
              ,{' '}
              <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-xs">bg-baingani-500</code>
              , or{' '}
              <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-xs">likhawat-4xl</code>
              .
            </p>
          </div>

          {/* Connector */}
          <div className="hidden md:flex items-center justify-center px-0 flex-shrink-0 -mx-px z-10">
            <div className="flex items-center">
              <div className="w-8 h-px bg-[#34343c]" />
              <span className="text-[#5c5c6a] text-xs font-mono mx-1">→</span>
              <div className="w-8 h-px bg-[#34343c]" />
            </div>
          </div>
          {/* Mobile connector */}
          <div className="md:hidden flex items-center justify-start pl-8 py-2">
            <span className="text-[#5c5c6a] text-xs font-mono rotate-90 block">→</span>
          </div>

          {/* Step 2 */}
          <div className="flex-1 border border-[#222228] bg-[#121216] rounded-xl p-8 text-left space-y-4 hover:border-[#34343c] transition-colors">
            <span className="text-xs font-mono text-[#5c5c6a] tracking-widest">02</span>
            <h3 className="text-lg font-bold text-white">Scan the DOM</h3>
            <p className="text-sm text-[#9a9aa8] leading-relaxed">
              Call{' '}
              <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-xs">runTalwinder()</code>
              . The engine scans the document, iterates over classes, and parses individual naming tokens.
            </p>
          </div>

          {/* Connector */}
          <div className="hidden md:flex items-center justify-center px-0 flex-shrink-0 -mx-px z-10">
            <div className="flex items-center">
              <div className="w-8 h-px bg-[#34343c]" />
              <span className="text-[#5c5c6a] text-xs font-mono mx-1">→</span>
              <div className="w-8 h-px bg-[#34343c]" />
            </div>
          </div>
          {/* Mobile connector */}
          <div className="md:hidden flex items-center justify-start pl-8 py-2">
            <span className="text-[#5c5c6a] text-xs font-mono rotate-90 block">→</span>
          </div>

          {/* Step 3 */}
          <div className="flex-1 border border-[#222228] bg-[#121216] rounded-xl p-8 text-left space-y-4 hover:border-[#34343c] transition-colors">
            <span className="text-xs font-mono text-[#5c5c6a] tracking-widest">03</span>
            <h3 className="text-lg font-bold text-white">Inject Generated CSS</h3>
            <p className="text-sm text-[#9a9aa8] leading-relaxed">
              It generates CSS rules and appends them to a style tag in the{' '}
              <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-xs">&lt;head&gt;</code>
              . In React, we trigger this in a custom hook.
            </p>
          </div>
        </div>
      </section>

      {/* Honest Limitations */}
      <section className="border-t border-[#222228] py-20 px-4 bg-[#0a0a0c]">
        <div className="max-w-4xl mx-auto glass-card border border-red-950/30 bg-red-950/5 p-8 md:p-12 space-y-6">
          <div className="flex items-center space-x-3 text-red-400">
            <ShieldAlert className="h-7 w-7" />
            <h2 className="text-2xl font-bold tracking-tight text-white">Honest Limitations Checklist</h2>
          </div>
          <p className="text-[#9a9aa8] text-sm leading-relaxed text-left">
            TalwinderCSS is a playground library designed for educational scanning purposes. It is important to know what features it does <strong>not</strong> support so that you write custom CSS where needed:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-2 text-sm text-[#9a9aa8]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#5c5c6a] shrink-0 mt-0.5" />
              <span><strong>No Rounded Corners / Shadows</strong>: Natively unsupported; use standard CSS (e.g. Tailwind v4 or raw stylesheets).</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#9a9aa8]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#5c5c6a] shrink-0 mt-0.5" />
              <span><strong>No responsive variants</strong>: Missing media query prefixes (e.g. no{' '}
                <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1 py-0.5 rounded border border-[#222228] text-xs">sm:</code>
                /
                <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1 py-0.5 rounded border border-[#222228] text-xs">md:</code>
                ).
              </span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#9a9aa8]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#5c5c6a] shrink-0 mt-0.5" />
              <span><strong>No pseudo-states</strong>: Missing focus, hover, active, or dark-mode variants natively.</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#9a9aa8]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#5c5c6a] shrink-0 mt-0.5" />
              <span><strong>No vertical centering</strong>: Missing `align-items` mappings in the flex modules.</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#9a9aa8]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#5c5c6a] shrink-0 mt-0.5" />
              <span><strong>No grid layout details</strong>: Supports{' '}
                <code className="bg-[#0a0a0c] text-[#9a9aa8] font-mono px-1 py-0.5 rounded border border-[#222228] text-xs">chai-grid</code>
                , but has no classes to define columns or template areas.
              </span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#9a9aa8]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#5c5c6a] shrink-0 mt-0.5" />
              <span><strong>No width / height utility</strong>: Use custom sizing properties inside your CSS or style sheets.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
