import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, BookOpen, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';
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
      {/* Background radial glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/10 blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold tracking-wide">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Desi CSS Utility Engine</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
              Style with an{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Indian Accent
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#a0a0ba] font-light max-w-2xl leading-relaxed">
              TalwinderCSS is a homemade, single-scan CSS utility engine. It reads your DOM, parses Hindi-inspired classes like <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded font-medium">bg-laal-500</code> and <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded font-medium">chaiPad-p-4</code>, and generates atomic styles on the fly.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/playground"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
              >
                <span>Try the Playground</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/docs/$section"
                params={{ section: 'getting-started' }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-[#22222a] text-white font-medium rounded-lg transition-colors duration-200"
              >
                <BookOpen className="h-4 w-4 text-gray-400" />
                <span>Read the Docs</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            {/* 3D Canvas element */}
            <div className="w-full max-w-[420px] aspect-square rounded-2xl border border-[#22222a]/50 bg-[#0e0e12]/40 backdrop-blur-sm overflow-hidden flex items-center justify-center relative shadow-2xl">
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/40 px-2.5 py-1 rounded-md text-[11px] text-[#62627a] border border-white/5 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
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
      <section className="border-y border-[#22222a] bg-[#0c0c0f]/50 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">The 10 Color Families</h2>
            <p className="text-[#a0a0ba] text-sm">
              Rendered directly using live Talwinder CSS background classes. Hover over swatches to inspect class naming.
            </p>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {COLORS_METADATA.map((color) => (
              <div key={color.name} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border border-[#1a1a24] bg-[#0f0f14] p-3 rounded-lg hover:border-[#2a2a38] transition-all">
                <div className="md:col-span-2 text-left px-2">
                  <span className="font-semibold text-white capitalize">{color.name}</span>
                  <span className="block text-xs text-[#62627a]">{color.desc}</span>
                </div>
                <div className="md:col-span-10 grid grid-cols-10 gap-1.5">
                  {SHADES.map((shade) => {
                    const bgClass = `bg-${color.name}-${shade}`;
                    return (
                      <div
                        key={shade}
                        className={`${bgClass} h-12 rounded flex flex-col items-center justify-end p-1 cursor-pointer transition-transform hover:scale-105 relative group border border-white/5`}
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

      {/* How it Works */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Simple Core Mechanism</h2>
          <p className="text-[#a0a0ba] max-w-2xl mx-auto">
            TalwinderCSS is lightweight and executes entirely on the client, scanning elements and compiling styling definitions instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-left space-y-4">
            <div className="h-10 w-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Write Markup</h3>
            <p className="text-sm text-[#a0a0ba] leading-relaxed">
              Use Hindi-inspired class names on your components, such as <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded text-xs">chai-flex</code>, <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded text-xs">bg-baingani-500</code>, or <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded text-xs">likhawat-4xl</code>.
            </p>
          </div>

          <div className="glass-card p-8 text-left space-y-4">
            <div className="h-10 w-10 rounded-lg bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Scan the DOM</h3>
            <p className="text-sm text-[#a0a0ba] leading-relaxed">
              Call <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded text-xs">runTalwinder()</code>. The engine scans the document, iterates over classes, and parses individual naming tokens.
            </p>
          </div>

          <div className="glass-card p-8 text-left space-y-4">
            <div className="h-10 w-10 rounded-lg bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Inject Generated CSS</h3>
            <p className="text-sm text-[#a0a0ba] leading-relaxed">
              It generates CSS rules and appends them to a style tag in the <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded text-xs">&lt;head&gt;</code>. In React, we trigger this in a custom hook.
            </p>
          </div>
        </div>
      </section>

      {/* Honest Limitations */}
      <section className="border-t border-[#22222a] py-20 px-4 bg-[#0a0a0c]">
        <div className="max-w-4xl mx-auto glass-card border border-red-950/30 bg-red-950/5 p-8 md:p-12 space-y-6">
          <div className="flex items-center space-x-3 text-red-400">
            <ShieldAlert className="h-7 w-7" />
            <h2 className="text-2xl font-bold tracking-tight text-white">Honest Limitations Checklist</h2>
          </div>
          <p className="text-[#a0a0ba] text-sm leading-relaxed text-left">
            TalwinderCSS is a playground library designed for educational scanning purposes. It is important to know what features it does <strong>not</strong> support so that you write custom CSS where needed:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-2 text-sm text-[#a0a0ba]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#62627a] shrink-0 mt-0.5" />
              <span><strong>No Rounded Corners / Shadows</strong>: Natively unsupported; use standard CSS (e.g. Tailwind v4 or raw stylesheets).</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#a0a0ba]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#62627a] shrink-0 mt-0.5" />
              <span><strong>No responsive variants</strong>: Missing media query prefixes (e.g. no <code className="text-xs text-pink-400 bg-pink-950/20 px-1">sm:</code>/<code className="text-xs text-pink-400 bg-pink-950/20 px-1">md:</code>).</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#a0a0ba]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#62627a] shrink-0 mt-0.5" />
              <span><strong>No pseudo-states</strong>: Missing focus, hover, active, or dark-mode variants natively.</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#a0a0ba]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#62627a] shrink-0 mt-0.5" />
              <span><strong>No vertical centering</strong>: Missing `align-items` mappings in the flex modules.</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#a0a0ba]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#62627a] shrink-0 mt-0.5" />
              <span><strong>No grid layout details</strong>: Supports <code className="text-xs text-pink-400 bg-pink-950/20 px-1">chai-grid</code>, but has no classes to define columns or template areas.</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-[#a0a0ba]">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#62627a] shrink-0 mt-0.5" />
              <span><strong>No width / height utility</strong>: Use custom sizing properties inside your CSS or style sheets.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
