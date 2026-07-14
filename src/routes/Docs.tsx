import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useTalwinder } from '../lib/useTalwinder';
import { Search, ChevronRight, Copy, Check, Info, AlertTriangle, Book, Palette, ArrowUpDown, Type, Frame, SlidersHorizontal } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  keywords: string[];
}

const SECTIONS: DocSection[] = [
  { id: 'getting-started', title: 'Getting Started', icon: <Book className="h-4 w-4" />, keywords: ['install', 'setup', 'npm', 'initialize', 'runTalwinder', 'hook', 'react'] },
  { id: 'colors', title: 'Colors', icon: <Palette className="h-4 w-4" />, keywords: ['laal', 'neela', 'hara', 'peela', 'baingani', 'gulabi', 'narangi', 'firozi', 'jamuni', 'dhusar', 'bg', 'text', 'shade'] },
  { id: 'spacing', title: 'Spacing', icon: <ArrowUpDown className="h-4 w-4" />, keywords: ['padding', 'margin', 'chaiPad', 'chaiMargin', 'scale', 'px', 'size'] },
  { id: 'typography', title: 'Typography', icon: <Type className="h-4 w-4" />, keywords: ['likhawat', 'font', 'size', 'xl', 'rem', 'text'] },
  { id: 'borders', title: 'Borders', icon: <SlidersHorizontal className="h-4 w-4" />, keywords: ['border', 'solid', 'dashed', 'dotted', 'double', 'width', 'style', 'color', 'gotcha'] },
  { id: 'layout', title: 'Layout & Flexbox', icon: <Frame className="h-4 w-4" />, keywords: ['chai-flex', 'chai-block', 'chai-grid', 'flex-row', 'flex-col', 'justify', 'unsupported'] },
];

export function Docs() {
  const { section = 'getting-started' } = useParams({ from: '/docs/$section' });
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Mount/State updates trigger styling scans
  useTalwinder([section]);

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filter sidebar sections
  const filteredSections = SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pl-80">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Fixed Left Sidebar on Desktop */}
        <aside className="w-full lg:w-72 shrink-0 lg:fixed lg:top-16 lg:left-0 lg:bottom-0 lg:bg-[#0c0c10]/80 lg:border-r lg:border-[#22222a]/50 lg:p-6 lg:z-30 lg:overflow-y-auto space-y-4 pt-8">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#62627a]" />
            <input
              type="text"
              placeholder="Filter docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121216] border border-[#22222a] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 placeholder-[#62627a]"
            />
          </div>

          {/* Section links */}
          <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {filteredSections.map((sec) => {
              const isActive = sec.id === section;
              return (
                <Link
                  key={sec.id}
                  to="/docs/$section"
                  params={{ section: sec.id }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-purple-950/40 border border-purple-800/30 text-purple-300'
                      : 'text-[#a0a0ba] hover:text-white hover:bg-[#121216] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={isActive ? 'text-purple-400' : 'text-[#62627a]'}>
                      {sec.icon}
                    </span>
                    <span>{sec.title}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-[#62627a] transition-transform ${isActive ? 'rotate-90 text-purple-400' : ''}`} />
                </Link>
              );
            })}
            
            {filteredSections.length === 0 && (
              <div className="text-center py-6 text-xs text-[#62627a]">
                No matching sections found.
              </div>
            )}
          </nav>
        </aside>

        {/* Documentation Content Area */}
        <main className="flex-grow w-full max-w-4xl text-left bg-[#0c0c0f]/60 border border-[#22222a]/50 p-6 md:p-10 rounded-2xl">
          
          {/* Section: Getting Started */}
          {section === 'getting-started' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white">Getting Started</h1>
                <p className="text-[#a0a0ba] text-sm">
                  Learn how to install, initialize, and manage TalwinderCSS in your web applications.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">Installation</h2>
                <p className="text-sm text-[#a0a0ba] leading-relaxed">
                  Install the core package from npm. TalwinderCSS has zero runtime dependencies and is fully ESM-compatible.
                </p>
                
                <div className="bg-[#121216] border border-[#22222a] p-4 rounded-lg flex items-center justify-between font-mono text-sm text-purple-400">
                  <code>npm install talwinder-ji-ki-css</code>
                  <button onClick={() => copyCode('npm install talwinder-ji-ki-css')} className="text-gray-400 hover:text-white p-1">
                    {copiedText === 'npm install talwinder-ji-ki-css' ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">How it Works</h2>
                <p className="text-sm text-[#a0a0ba] leading-relaxed">
                  The engine exports a single function <code className="text-pink-400 bg-pink-950/20 px-1 py-0.5 rounded font-mono">runTalwinder()</code>.
                  Unlike Tailwind which parses source files at build-time, TalwinderCSS runs entirely in the browser at run-time:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-[#a0a0ba] leading-relaxed">
                  <li>It runs a synchronous query for all elements with a class attribute: <code className="text-xs bg-[#16171d] px-1 py-0.5 rounded">document.querySelectorAll('[class]')</code>.</li>
                  <li>It parses each individual class string using a simple hyphen token splitter.</li>
                  <li>It checks if the parsed values match the whitelisted grammar patterns.</li>
                  <li>It builds corresponding raw CSS rules and appends them inside a newly created stylesheet within the document head.</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">Integrating with React</h2>
                <p className="text-sm text-[#a0a0ba] leading-relaxed">
                  Because the scan is synchronous and does not monitor DOM mutations, dynamically rendered elements (like boxes responding to state changes in React) will not trigger style generation automatically. To solve this, wrap the scanner inside a useEffect hook that re-runs when state dependencies update:
                </p>

                <div className="bg-[#121216] border border-[#22222a] p-4 rounded-lg relative font-mono text-xs text-gray-300 overflow-x-auto space-y-2">
                  <span className="block text-[#62627a] font-semibold">// src/lib/useTalwinder.ts</span>
                  <pre>{`import { useEffect } from "react";
import { runTalwinder } from "talwinder-ji-ki-css";

export function useTalwinder(deps: React.DependencyList = []) {
  useEffect(() => {
    runTalwinder();
  }, deps);
}`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Section: Colors */}
          {section === 'colors' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white">Colors</h1>
                <p className="text-[#a0a0ba] text-sm">
                  Talwinder supports exactly 10 color families, each with 10 shades ranging from 50 to 900.
                </p>
              </div>

              {/* Alert Note */}
              <div className="p-4 bg-purple-950/10 border border-purple-800/30 text-purple-300 rounded-lg flex items-start space-x-3 text-sm">
                <Info className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Name Checker:</strong> Ensure you use <code className="text-pink-400 font-mono">baingani</code> (purple scale) and <code className="text-pink-400 font-mono">jamuni</code> (indigo scale). The engine resolves the naming strictly based on these keys.
                </p>
              </div>

              <div className="space-y-8">
                {SECTIONS[1].keywords.slice(0, 10).map((colorName) => (
                  <div key={colorName} className="space-y-3">
                    <h3 className="text-md font-bold text-white capitalize border-b border-[#22222a] pb-1.5">{colorName} Scale</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {['100', '300', '500', '700', '900'].map((shade) => {
                        const bgCls = `bg-${colorName}-${shade}`;
                        const textCls = `text-${colorName}-${shade}`;
                        return (
                          <div key={shade} className="border border-[#22222a] bg-[#121216] p-3 rounded-lg flex flex-col justify-between space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-gray-400 font-bold font-mono">{shade}</span>
                              <span className={`h-2.5 w-2.5 rounded-full ${bgCls}`} />
                            </div>
                            
                            <div className="space-y-1">
                              {/* Background copy */}
                              <button
                                onClick={() => copyCode(bgCls)}
                                className="w-full flex items-center justify-between bg-black/40 px-2 py-1 rounded text-[10px] text-purple-400 font-mono hover:bg-black/60 transition-colors text-left"
                              >
                                <span>{bgCls}</span>
                                {copiedText === bgCls ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-gray-500" />}
                              </button>

                              {/* Text copy */}
                              <button
                                onClick={() => copyCode(textCls)}
                                className="w-full flex items-center justify-between bg-black/40 px-2 py-1 rounded text-[10px] text-pink-400 font-mono hover:bg-black/60 transition-colors text-left"
                              >
                                <span>{textCls}</span>
                                {copiedText === textCls ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-gray-500" />}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Spacing */}
          {section === 'spacing' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white">Spacing</h1>
                <p className="text-[#a0a0ba] text-sm">
                  Talwinder uses a predefined spacing key scale for padding, margins, borders, and fonts.
                </p>
              </div>

              {/* Spacing explanation */}
              <div className="text-sm text-[#a0a0ba] space-y-2 leading-relaxed">
                <p>
                  The full whitelisted spacing scale contains:
                </p>
                <code className="block bg-[#121216] border border-[#22222a] p-3 rounded-lg text-xs text-purple-400 font-mono leading-relaxed">
                  0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
                </code>
                <p className="mt-2">
                  When used with padding and margins, spacing values are resolved into **pixels** (e.g. <code className="text-pink-400">chaiPad-p-4</code> sets padding to 16px).
                </p>
              </div>

              {/* Interactive Demo */}
              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">Padding Demo</h2>
                
                <div className="space-y-4 bg-[#121216] border border-[#22222a] p-6 rounded-xl">
                  {['2', '4', '8', '12'].map((key) => {
                    const padClass = `chaiPad-p-${key}`;
                    return (
                      <div key={key} className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#22222a] pb-4 last:border-b-0 last:pb-0 gap-4">
                        <div className="text-left font-mono">
                          <span className="block text-sm text-purple-400">{padClass}</span>
                          <span className="text-[10px] text-[#62627a]">Resolved padding: {parseFloat(key) * 4}px</span>
                        </div>
                        {/* Demo box styled with Talwinder padding class */}
                        <div className="bg-[#1e1e24] border border-[#333340] rounded-lg">
                          <div className={`${padClass} bg-baingani-900 border border-solid border-baingani-500 text-baingani-100 text-xs font-semibold rounded`}>
                            Spacing key: {key}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Section: Typography */}
          {section === 'typography' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white">Typography</h1>
                <p className="text-[#a0a0ba] text-sm">
                  Apply font-size values using the specialized <code className="text-pink-400 font-mono">likhawat-&lt;key&gt;xl</code> utility.
                </p>
              </div>

              {/* Info note */}
              <div className="p-4 bg-orange-950/10 border border-orange-850/30 text-orange-300 rounded-lg flex items-start space-x-3 text-sm">
                <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Suffix format:</strong> The prefix is <code className="text-pink-400 font-mono">likhawat-</code> followed directly by the spacing key and suffix <code className="text-pink-400 font-mono">xl</code> with <strong>no hyphen</strong> in between (e.g. <code className="text-pink-400 font-mono">likhawat-16xl</code>, not <code className="text-pink-400 font-mono">likhawat-16-xl</code>).
                </p>
              </div>

              {/* Rem calculation details */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">Font Size Resolution</h2>
                <p className="text-sm text-[#a0a0ba] leading-relaxed">
                  Font sizes are resolved in **rem** units based on the spacing key scale. The engine maps the key to a rem value (e.g. key `4` maps to `1.0rem` / 16px).
                </p>

                <div className="space-y-4 bg-[#121216] border border-[#22222a] p-6 rounded-xl">
                  {['1', '4', '8', '16'].map((key) => {
                    const textClass = `likhawat-${key}xl`;
                    const remValue = parseFloat(key) * 0.25;
                    return (
                      <div key={key} className="border-b border-[#22222a] pb-4 last:border-b-0 last:pb-0 space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono text-[#62627a]">
                          <span className="text-purple-400">{textClass}</span>
                          <span>{remValue}rem ({remValue * 16}px)</span>
                        </div>
                        {/* Live demo text styled via Talwinder likhawat-class */}
                        <div className="bg-black/35 p-3 rounded border border-white/5">
                          <p className={`${textClass} text-firozi-400 font-bold`}>
                            Talwinder Typography
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Section: Borders */}
          {section === 'borders' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white">Borders</h1>
                <p className="text-[#a0a0ba] text-sm">
                  Compose borders in TalwinderCSS by applying separate classes for width, style, and color.
                </p>
              </div>

              {/* The Border Gotcha */}
              <div className="p-5 bg-red-950/10 border border-red-900/30 text-red-300 rounded-lg space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="font-bold text-white text-sm">Critical Shorthand Order Gotcha!</h3>
                </div>
                <p className="text-xs leading-relaxed text-red-300">
                  Because the width class generates a CSS rule mapping to shorthand <code className="text-pink-400">border: &lt;px&gt;</code>, it resets border-style to <code className="text-pink-400">none</code> and border-color to <code className="text-pink-400">currentcolor</code>. To ensure styles apply successfully, you must write border classes in this exact order: <strong>Width class, Style class, and then Color class</strong>.
                </p>
              </div>

              {/* Side by side comparison */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">Live Order Comparison</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Correct block */}
                  <div className="bg-[#121216] border border-[#22222a] p-5 rounded-xl space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-green-400 uppercase font-mono">Correct Class Order</span>
                    </div>
                    <code className="block bg-[#16171d] p-2 rounded text-[11px] text-purple-400 font-mono break-words">
                      className="border-8 border-solid border-neela-500 bg-neela-900 text-neela-100 chaiPad-p-4 likhawat-3xl"
                    </code>
                    {/* Live Box Correct Order */}
                    <div className="w-full flex items-center justify-center py-6 bg-black/40 rounded border border-white/5">
                      <div className="border-8 border-solid border-neela-500 bg-neela-900 text-neela-100 chaiPad-p-4 likhawat-3xl font-semibold">
                        Border Works!
                      </div>
                    </div>
                  </div>

                  {/* Incorrect block */}
                  <div className="bg-[#121216] border border-[#22222a] p-5 rounded-xl space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-bold text-red-400 uppercase font-mono">Incorrect Class Order</span>
                    </div>
                    <code className="block bg-[#16171d] p-2 rounded text-[11px] text-purple-400 font-mono break-words">
                      className="border-solid border-neela-500 border-8 bg-neela-900 text-neela-100 chaiPad-p-4 likhawat-3xl"
                    </code>
                    {/* Live Box Incorrect Order */}
                    <div className="w-full flex items-center justify-center py-6 bg-black/40 rounded border border-white/5">
                      <div className="border-solid border-neela-500 border-8 bg-neela-900 text-neela-100 chaiPad-p-4 likhawat-3xl font-semibold">
                        No Border Styled!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Layout */}
          {section === 'layout' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white">Layout & Flexbox</h1>
                <p className="text-[#a0a0ba] text-sm">
                  Position and align items in container rows/columns using display and flexbox utilities.
                </p>
              </div>

              {/* Display Table */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">Display Prefix (chai-)</h2>
                <p className="text-sm text-[#a0a0ba] leading-relaxed">
                  Display properties are prefixed with <code className="text-pink-400 font-mono">chai-</code>. Bare display classes like <code className="text-xs bg-[#16171d] px-1 py-0.5 text-red-400">flex</code> or <code className="text-xs bg-[#16171d] px-1 py-0.5 text-red-400">hidden</code> are not mapped.
                </p>

                <div className="bg-[#121216] border border-[#22222a] rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead className="bg-[#1b1b22] text-xs font-bold text-[#62627a] uppercase border-b border-[#22222a]">
                      <tr>
                        <th className="px-4 py-3">Talwinder Class</th>
                        <th className="px-4 py-3">CSS Rule generated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#22222a]">
                      <tr>
                        <td className="px-4 py-3 text-purple-400 font-mono">chai-flex</td>
                        <td className="px-4 py-3 font-mono">display: flex;</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-purple-400 font-mono">chai-block</td>
                        <td className="px-4 py-3 font-mono">display: block;</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-purple-400 font-mono">chai-grid</td>
                        <td className="px-4 py-3 font-mono">display: grid;</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-purple-400 font-mono">chai-hidden</td>
                        <td className="px-4 py-3 font-mono">display: none;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Flexbox */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-[#22222a] pb-2">Flexbox Alignment</h2>
                <p className="text-sm text-[#a0a0ba] leading-relaxed">
                  Flex directions and justify controls are mapped as bare classes.
                </p>

                {/* Live Flex Row Demo */}
                <div className="bg-[#121216] border border-[#22222a] p-5 rounded-xl space-y-4">
                  <span className="text-xs text-purple-400 font-mono block">className="chai-flex flex-row justify-between"</span>
                  <div className="chai-flex flex-row justify-between border border-dashed border-purple-500/30 p-3 bg-black/35 rounded-lg">
                    <div className="bg-baingani-900 border border-solid border-baingani-500 text-baingani-100 chaiPad-p-3 rounded text-xs font-bold">Item 1</div>
                    <div className="bg-baingani-900 border border-solid border-baingani-500 text-baingani-100 chaiPad-p-3 rounded text-xs font-bold">Item 2</div>
                    <div className="bg-baingani-900 border border-solid border-baingani-500 text-baingani-100 chaiPad-p-3 rounded text-xs font-bold">Item 3</div>
                  </div>
                </div>
              </div>

              {/* What is NOT supported */}
              <div className="p-5 bg-red-950/10 border border-red-900/30 rounded-xl space-y-3 text-left">
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <h3 className="font-bold text-white text-sm">Unsupported Layout Properties</h3>
                </div>
                <p className="text-xs text-[#a0a0ba] leading-relaxed">
                  The flex module in Talwinder has no vertical alignment mapping (<code className="text-xs bg-red-950/40 text-red-400">align-items</code> / <code className="text-xs bg-red-950/40 text-red-400">items-center</code> is missing). It also lacks gap/spacing values (<code className="text-xs bg-red-950/40 text-red-400">gap-*</code>) or layout positioning tools (no relative, absolute, z-index, or sizing constraints). Style these using custom CSS properties.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
