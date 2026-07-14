import { useState } from 'react';
import { useTalwinder } from '../lib/useTalwinder';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Plus, Trash2, Sliders, LayoutGrid } from 'lucide-react';

interface BoxConfig {
  id: string;
  name: string;
  bgColorKey: string;
  bgShade: string;
  textColorKey: string;
  textShade: string;
  paddingSide: string;
  paddingKey: string;
  marginSide: string;
  marginKey: string;
  borderWidth: string;
  borderStyle: string;
  borderColorKey: string;
  borderColorShade: string;
  fontSize: string;
  display: string;
  flexDirection: string;
  justifyContent: string;
  textContent: string;
}

const DEFAULT_BOX = (id: string, name: string): BoxConfig => ({
  id,
  name,
  bgColorKey: 'baingani',
  bgShade: '900',
  textColorKey: 'baingani',
  textShade: '100',
  paddingSide: 'p',
  paddingKey: '4',
  marginSide: 'm',
  marginKey: '0',
  borderWidth: '2',
  borderStyle: 'solid',
  borderColorKey: 'baingani',
  borderColorShade: '500',
  fontSize: '4',
  display: 'chai-flex',
  flexDirection: 'flex-col',
  justifyContent: 'justify-center',
  textContent: 'Swadeshi Box',
});

const PRESETS = [
  {
    name: '🔥 Desi Alert',
    config: {
      bgColorKey: 'laal',
      bgShade: '900',
      textColorKey: 'laal',
      textShade: '100',
      paddingSide: 'p',
      paddingKey: '5',
      marginSide: 'm',
      marginKey: '0',
      borderWidth: '2',
      borderStyle: 'solid',
      borderColorKey: 'laal',
      borderColorShade: '400',
      fontSize: '4',
      display: 'chai-flex',
      flexDirection: 'flex-col',
      justifyContent: 'justify-center',
      textContent: 'Savdhaan! Yeh ek Talwinder Alert hai.',
    },
  },
  {
    name: '🌿 Hara Card',
    config: {
      bgColorKey: 'hara',
      bgShade: '800',
      textColorKey: 'hara',
      textShade: '50',
      paddingSide: 'p',
      paddingKey: '6',
      marginSide: 'm',
      marginKey: '0',
      borderWidth: '1',
      borderStyle: 'dashed',
      borderColorKey: 'hara',
      borderColorShade: '300',
      fontSize: '3.5',
      display: 'chai-flex',
      flexDirection: 'flex-col',
      justifyContent: 'justify-center',
      textContent: 'Green & Serene',
    },
  },
  {
    name: '🌌 Deep Blue Sky',
    config: {
      bgColorKey: 'jamuni',
      bgShade: '900',
      textColorKey: 'jamuni',
      textShade: '100',
      paddingSide: 'p',
      paddingKey: '8',
      marginSide: 'm',
      marginKey: '0',
      borderWidth: '4',
      borderStyle: 'double',
      borderColorKey: 'jamuni',
      borderColorShade: '500',
      fontSize: '6',
      display: 'chai-flex',
      flexDirection: 'flex-col',
      justifyContent: 'justify-center',
      textContent: 'Royal Jamuni Style',
    },
  },
];

const COLORS = ['laal', 'neela', 'hara', 'peela', 'baingani', 'gulabi', 'narangi', 'firozi', 'jamuni', 'dhusar'];
const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const SPACING_KEYS = ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'];
const BORDER_STYLES = ['solid', 'dashed', 'dotted', 'double', 'none'];
const DISPLAYS = ['chai-flex', 'chai-block', 'chai-grid', 'chai-inline-block', 'chai-hidden'];
const FLEX_DIRECTIONS = ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'];
const JUSTIFIES = ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'];

export function Playground() {
  const [boxes, setBoxes] = useState<BoxConfig[]>([DEFAULT_BOX('1', 'Box A')]);
  const [activeBoxId, setActiveBoxId] = useState<string>('1');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const activeBox = boxes.find((b) => b.id === activeBoxId) || boxes[0];

  // Serialized config state triggers compile scan immediately upon any slider adjustments
  useTalwinder([JSON.stringify(boxes)]);

  const updateActiveBox = (key: keyof BoxConfig, value: string) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === activeBoxId ? { ...box, [key]: value } : box))
    );
  };

  const applyPreset = (presetConfig: typeof PRESETS[0]['config']) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === activeBoxId ? { ...box, ...presetConfig } : box))
    );
  };

  const addNewBox = () => {
    const nextId = (Math.max(...boxes.map((b) => parseInt(b.id))) + 1).toString();
    const nextName = `Box ${String.fromCharCode(65 + boxes.length)}`;
    const newBox = DEFAULT_BOX(nextId, nextName);
    setBoxes((prev) => [...prev, newBox]);
    setActiveBoxId(nextId);
  };

  const removeBox = (id: string) => {
    if (boxes.length <= 1) return;
    const remaining = boxes.filter((b) => b.id !== id);
    setBoxes(remaining);
    setActiveBoxId(remaining[0].id);
  };

  // Helper to compile class names based on a box configuration
  // Note border order: Width class, then Style class, then Color class
  const getBoxClasses = (box: BoxConfig) => {
    const parts: string[] = [];
    
    // Display
    parts.push(box.display);

    // Flex attributes
    if (box.display === 'chai-flex') {
      parts.push(box.flexDirection);
      parts.push(box.justifyContent);
    }

    // Padding & Margin
    parts.push(`chaiPad-${box.paddingSide}-${box.paddingKey}`);
    if (box.marginKey !== '0') {
      parts.push(`chaiMargin-${box.marginSide}-${box.marginKey}`);
    }

    // Border Width, Style, Color - CRITICAL: Exact width, style, color order
    parts.push(`border-${box.borderWidth}`);
    parts.push(`border-${box.borderStyle}`);
    parts.push(`border-${box.borderColorKey}-${box.borderColorShade}`);

    // Font-size
    parts.push(`likhawat-${box.fontSize}xl`);

    // Text color
    parts.push(`text-${box.textColorKey}-${box.textShade}`);

    // Background color
    parts.push(`bg-${box.bgColorKey}-${box.bgShade}`);

    return parts.join(' ');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#22222a] pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Sliders className="h-7 w-7 text-purple-400" />
            Interactive Playground
          </h1>
          <p className="text-sm text-[#a0a0ba] mt-1">
            Build, combine, and compare styling components using Talwinder CSS utility classes.
          </p>
        </div>
        
        {/* Preset Strip */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#62627a] font-medium uppercase tracking-wider">Presets:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.config)}
              className="px-3 py-1 text-xs bg-[#121216] border border-[#22222a] hover:border-[#333340] rounded-md transition-colors text-gray-300"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Control Panel + Preview workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Control Panel */}
        <div className="lg:col-span-4 order-2 lg:order-1 space-y-6">
          
          {/* Active Box Selector */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#a0a0ba] uppercase tracking-wider">Configure Boxes</span>
              <button
                onClick={addNewBox}
                className="flex items-center space-x-1 text-xs font-semibold px-2 py-1 rounded bg-purple-950/40 text-purple-300 border border-purple-800/30 hover:bg-purple-900/40 transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add Box</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {boxes.map((b) => (
                <div key={b.id} className="relative group flex items-center">
                  <button
                    onClick={() => setActiveBoxId(b.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                      b.id === activeBoxId
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-[#16171d] text-[#a0a0ba] border-[#22222a] hover:border-[#333340]'
                    }`}
                  >
                    {b.name}
                  </button>
                  {boxes.length > 1 && (
                    <button
                      onClick={() => removeBox(b.id)}
                      className="ml-1 p-1 text-[#62627a] hover:text-red-400 hover:bg-red-950/20 rounded transition-colors"
                      title="Delete box"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Controls */}
          <div className="glass-card p-6 space-y-5 text-left">
            <div className="border-b border-[#22222a] pb-3 mb-2 flex items-center justify-between">
              <h2 className="text-md font-bold text-white uppercase tracking-wider">
                {activeBox.name} Settings
              </h2>
              <span className="text-[10px] bg-[#1d1d26] px-2 py-0.5 rounded text-purple-300 uppercase tracking-widest">
                Talwinder Whitelist
              </span>
            </div>

            {/* Custom Content Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#a0a0ba]">Box Text Content</label>
              <input
                type="text"
                value={activeBox.textContent}
                onChange={(e) => updateActiveBox('textContent', e.target.value)}
                className="w-full bg-[#16171d] border border-[#22222a] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Background Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Bg Color</label>
                <select
                  value={activeBox.bgColorKey}
                  onChange={(e) => updateActiveBox('bgColorKey', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 capitalize"
                >
                  {COLORS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Bg Shade</label>
                <select
                  value={activeBox.bgShade}
                  onChange={(e) => updateActiveBox('bgShade', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {SHADES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Text Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Text Color</label>
                <select
                  value={activeBox.textColorKey}
                  onChange={(e) => updateActiveBox('textColorKey', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 capitalize"
                >
                  {COLORS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Text Shade</label>
                <select
                  value={activeBox.textShade}
                  onChange={(e) => updateActiveBox('textShade', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {SHADES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Font Size & Display */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Font Size Key</label>
                <select
                  value={activeBox.fontSize}
                  onChange={(e) => updateActiveBox('fontSize', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {/* Filter a nice subset of spacing keys for fonts */}
                  {['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '12', '16', '20', '24'].map((s) => (
                    <option key={s} value={s}>{s}xl ({parseFloat(s) * 0.25}rem)</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Display</label>
                <select
                  value={activeBox.display}
                  onChange={(e) => updateActiveBox('display', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {DISPLAYS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Flex Rules - Rendered conditionally */}
            {activeBox.display === 'chai-flex' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-3 bg-[#13131a] p-3 rounded-lg border border-[#22222a] overflow-hidden"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#62627a] uppercase tracking-wider">Flex Direction</label>
                  <select
                    value={activeBox.flexDirection}
                    onChange={(e) => updateActiveBox('flexDirection', e.target.value)}
                    className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-purple-500"
                  >
                    {FLEX_DIRECTIONS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#62627a] uppercase tracking-wider">Justify Content</label>
                  <select
                    value={activeBox.justifyContent}
                    onChange={(e) => updateActiveBox('justifyContent', e.target.value)}
                    className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-purple-500"
                  >
                    {JUSTIFIES.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {/* Padding Setup */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Padding Side</label>
                <select
                  value={activeBox.paddingSide}
                  onChange={(e) => updateActiveBox('paddingSide', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="p">p (all sides)</option>
                  <option value="px">px (left/right)</option>
                  <option value="py">py (top/bottom)</option>
                  <option value="pt">pt (top)</option>
                  <option value="pb">pb (bottom)</option>
                  <option value="pl">pl (left)</option>
                  <option value="pr">pr (right)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Padding Spacing</label>
                <select
                  value={activeBox.paddingKey}
                  onChange={(e) => updateActiveBox('paddingKey', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {SPACING_KEYS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Margin Setup */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Margin Side</label>
                <select
                  value={activeBox.marginSide}
                  onChange={(e) => updateActiveBox('marginSide', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="m">m (all sides)</option>
                  <option value="mx">mx (left/right)</option>
                  <option value="my">my (top/bottom)</option>
                  <option value="mt">mt (top)</option>
                  <option value="mb">mb (bottom)</option>
                  <option value="ml">ml (left)</option>
                  <option value="mr">mr (right)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a0a0ba]">Margin Spacing</label>
                <select
                  value={activeBox.marginKey}
                  onChange={(e) => updateActiveBox('marginKey', e.target.value)}
                  className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {SPACING_KEYS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Border Setup */}
            <div className="space-y-3.5 border-t border-[#22222a] pt-4 mt-2">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest block">Border Config</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#a0a0ba]">Border Width</label>
                  <select
                    value={activeBox.borderWidth}
                    onChange={(e) => updateActiveBox('borderWidth', e.target.value)}
                    className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {SPACING_KEYS.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#a0a0ba]">Border Style</label>
                  <select
                    value={activeBox.borderStyle}
                    onChange={(e) => updateActiveBox('borderStyle', e.target.value)}
                    className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {BORDER_STYLES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#a0a0ba]">Border Color</label>
                  <select
                    value={activeBox.borderColorKey}
                    onChange={(e) => updateActiveBox('borderColorKey', e.target.value)}
                    className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 capitalize"
                  >
                    {COLORS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#a0a0ba]">Border Shade</label>
                  <select
                    value={activeBox.borderColorShade}
                    onChange={(e) => updateActiveBox('borderColorShade', e.target.value)}
                    className="w-full bg-[#16171d] border border-[#22222a] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {SHADES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Previews */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
          <div className="glass-card p-6 flex flex-col items-center justify-between min-h-[500px] relative">
            <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/40 px-2 py-1 rounded text-xs text-[#a0a0ba] border border-white/5 font-semibold uppercase tracking-wider">
              <LayoutGrid className="h-3.5 w-3.5 text-purple-400" />
              <span>Workspace Previews</span>
            </div>
            
            {/* Box Comparison Layout */}
            <div className="w-full flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 p-6 mt-6 items-start justify-center">
              <AnimatePresence>
                {boxes.map((box) => {
                  const appliedClasses = getBoxClasses(box);
                  return (
                    <motion.div
                      key={box.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="w-full max-w-sm flex flex-col space-y-4"
                    >
                      {/* Box label and active state indicator */}
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-[#62627a] uppercase tracking-wider">
                          {box.name} {box.id === activeBoxId && '(Editing)'}
                        </span>
                        {box.id === activeBoxId && (
                          <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                        )}
                      </div>

                      {/* THE PREVIEW BOX ITSELF styled via computed Talwinder classes */}
                      <div className="relative group">
                        {/* Wrapper for hover styling and size constraints - chrome */}
                        <div className="w-full aspect-square rounded-xl bg-[#0f0f14] border border-[#22222a] flex items-center justify-center p-4">
                          {/* Inner element styled solely with dynamic Talwinder classes */}
                          <div className={appliedClasses}>
                            <span>{box.textContent}</span>
                          </div>
                        </div>
                      </div>

                      {/* Display class name and copy chip */}
                      <div className="bg-[#121216] border border-[#22222a] rounded-lg p-3 relative flex items-center justify-between text-left">
                        <div className="pr-10">
                          <span className="block text-[10px] text-[#62627a] uppercase font-bold tracking-wider mb-1">
                            Applied Classes
                          </span>
                          <code className="text-xs text-purple-400 break-all select-all font-mono font-medium block">
                            {appliedClasses}
                          </code>
                        </div>
                        <button
                          onClick={() => copyToClipboard(appliedClasses, box.id)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-[#1b1b22]/50 hover:bg-[#1b1b22] text-gray-400 hover:text-white rounded-md border border-white/5 transition-all"
                          title="Copy class combination"
                        >
                          {copiedStates[box.id] ? (
                            <Check className="h-4 w-4 text-green-400 animate-bounce" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="w-full border-t border-[#22222a] pt-4 mt-6 text-left text-xs text-[#62627a]">
              <span className="font-bold text-white block mb-1">💡 Pro Tip on Border Shorthand resets:</span>
              <p>
                In the Talwinder engine, the border width class sets the shorthand <code className="text-pink-400">border</code> property, resetting style and color to initial values. The generated preview strictly places <code className="text-purple-400">border-width</code> class first, followed by <code className="text-purple-400">border-style</code> and <code className="text-purple-400">border-color</code>, ensuring they combine successfully.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
