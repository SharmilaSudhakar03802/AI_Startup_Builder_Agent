import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, Globe, Type, Wand2, Download, Layers } from 'lucide-react';

export default function BrandingTab({ data }) {
  if (!data) return null;
  const { branding } = data;

  const [copiedHex, setCopiedHex] = useState(null);

  // Real-Time Interactive Logo Customizer State
  const [logoStyle, setLogoStyle] = useState('gradient'); // 'gradient', 'neon', 'minimal', 'badge'
  const [logoColorPrimary, setLogoColorPrimary] = useState(branding.colorPalette[0].hex);
  const [logoColorSecondary, setLogoColorSecondary] = useState(branding.colorPalette[1].hex);
  const [customEmoji, setCustomEmoji] = useState(branding.brandName.toLowerCase().includes('bakery') ? '🥐' : '⚡');

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Brand Hero Identity Card */}
      <div className="glass-panel p-8 border border-pink-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Palette className="w-48 h-48 text-pink-500" />
        </div>

        <div className="max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-pink-500/15 text-pink-300 border border-pink-500/30 rounded-full">
            Identity Identity Artifact
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-2 tracking-tight">
            {branding.brandName}
          </h2>
          <p className="text-lg md:text-xl font-medium text-pink-300 mb-4">
            "{branding.tagline}"
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 bg-slate-900 text-slate-300 rounded-lg border border-slate-800">
              Vibe: {branding.brandVibe}
            </span>
          </div>
        </div>
      </div>

      {/* REAL-TIME INTERACTIVE LOGO BUILDER */}
      <div className="glass-panel p-6 border border-pink-500/30 bg-slate-900/90">
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Real-Time AI Vector Logo Builder & Customizer
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">Live Studio</span>
              </h3>
              <p className="text-xs text-slate-400">Customize logo icon, gradients, style & visual identity in real-time</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Controls Column */}
          <div className="space-y-4 md:col-span-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Logo Render Style:</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'gradient', label: 'Gradient Glow' },
                  { id: 'neon', label: 'Neon Cyber' },
                  { id: 'minimal', label: 'Sleek Minimal' },
                  { id: 'badge', label: 'Artisan Badge' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setLogoStyle(st.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                      logoStyle === st.id
                        ? 'bg-pink-600 text-white shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Icon Symbol:</label>
              <div className="flex items-center gap-2">
                {['🥐', '🍞', '⚡', '🚀', '☕', '🐾', '🛡️', '✨'].map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => setCustomEmoji(emoji)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition ${
                      customEmoji === emoji ? 'bg-pink-500/20 border-2 border-pink-500 text-white' : 'bg-slate-950 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Render Canvas */}
          <div className="glass-panel p-6 border border-slate-800 flex flex-col items-center justify-center text-center bg-slate-950">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">Live SVG Preview</span>

            <div
              className={`w-32 h-32 rounded-3xl flex items-center justify-center text-white text-6xl shadow-2xl mb-4 transition-all duration-500 ${
                logoStyle === 'gradient' ? 'border border-white/20' :
                logoStyle === 'neon' ? 'border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)]' :
                logoStyle === 'minimal' ? 'bg-slate-900 border border-slate-700' :
                'border-4 border-dashed border-amber-400'
              }`}
              style={{
                background: logoStyle === 'minimal' ? undefined : `linear-gradient(135deg, ${logoColorPrimary}, ${logoColorSecondary})`
              }}
            >
              {customEmoji}
            </div>

            <span className="font-extrabold text-white text-lg tracking-tight">{branding.brandName}</span>
            <span className="text-[11px] text-pink-400 font-semibold mt-0.5">Vector Visual Identity</span>
          </div>
        </div>
      </div>

      {/* Color Palette Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-400" />
          <span>Curated Design Tokens Color Palette</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {branding.colorPalette.map((color, i) => (
            <div
              key={i}
              onClick={() => handleCopyHex(color.hex)}
              className="glass-panel p-4 border border-slate-800 hover:border-pink-500/50 cursor-pointer group transition flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-full h-24 rounded-xl mb-3 border border-white/10 flex items-end justify-end p-2 transition group-hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="text-xs font-bold font-mono px-2 py-1 bg-black/70 rounded text-white backdrop-blur">
                    {color.hex}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{color.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{color.usage}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-pink-400 font-semibold">
                <span>{copiedHex === color.hex ? 'Copied Hex!' : 'Click to Copy'}</span>
                {copiedHex === color.hex ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Logo Generation Prompt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 border border-slate-800 md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">AI Logo Prompt Specification</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Optimized prompt for Midjourney v6, DALL-E 3, or Stable Diffusion vector logo creation.
          </p>
          <div className="code-container p-4 text-xs font-mono text-amber-300 leading-relaxed">
            {branding.logoPrompt}
          </div>
        </div>

        {/* Domains Check */}
        <div className="glass-panel p-6 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>Domain Availability</span>
          </h3>

          <div className="space-y-3">
            {branding.domainsAvailable.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                <span className="font-mono text-white font-semibold">{d.domain}</span>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md font-bold">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}