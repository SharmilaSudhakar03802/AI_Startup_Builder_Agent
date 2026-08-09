import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, Globe, Type, Image as ImageIcon } from 'lucide-react';

export default function BrandingTab({ data }) {
  if (!data) return null;
  const { branding } = data;
  const [copiedHex, setCopiedHex] = useState(null);

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Brand Hero Card */}
      <div className="glass-panel p-8 border border-pink-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Palette className="w-48 h-48 text-pink-500" />
        </div>

        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-full">
            Generated Identity
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-2 tracking-tight">
            {branding.brandName}
          </h2>
          <p className="text-lg md:text-xl font-medium text-pink-300 mb-4">
            "{branding.tagline}"
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">
              Vibe: {branding.brandVibe}
            </span>
          </div>
        </div>
      </div>

      {/* Color Palette Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-400" />
          <span>Curated Color System Tokens</span>
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
                  <span className="text-xs font-bold font-mono px-2 py-1 bg-black/60 rounded text-white backdrop-blur">
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

      {/* AI Logo Generator & Visual Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 border border-slate-800 md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">AI Logo Generation Prompt</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Optimized prompt for Midjourney, DALL-E 3, or Stable Diffusion vector logo creation.
          </p>
          <div className="code-container p-4 text-xs font-mono text-amber-300 leading-relaxed relative group">
            {branding.logoPrompt}
          </div>
        </div>

        {/* Live Vector SVG Logo Card */}
        <div className="glass-panel p-6 border border-slate-800 flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Generated Logo Concept</h4>
          <div
            className="w-28 h-28 rounded-2xl flex items-center justify-center text-white text-5xl shadow-2xl mb-3 border border-white/20"
            style={{
              background: `linear-gradient(135deg, ${branding.colorPalette[0].hex}, ${branding.colorPalette[1].hex})`
            }}
          >
            {branding.brandName.toLowerCase().includes('bakery') ? '🥐' : '⚡'}
          </div>
          <span className="font-extrabold text-white text-base tracking-tight">{branding.brandName}</span>
          <span className="text-[10px] text-pink-400 font-semibold mt-1">Vector Logo Identity</span>
        </div>
      </div>

      {/* Typography & Domains Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Typography */}
        <div className="glass-panel p-6 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Type className="w-5 h-5 text-cyan-400" />
            <span>Google Font Pairings</span>
          </h3>

          <div className="space-y-4">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Heading Font</span>
              <p className="text-xl font-bold text-white mt-1" style={{ fontFamily: branding.typography.headingFont }}>
                {branding.typography.headingFont} — Modern Bold Headings
              </p>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Body Font</span>
              <p className="text-sm text-slate-300 mt-1" style={{ fontFamily: branding.typography.bodyFont }}>
                {branding.typography.bodyFont} — Clean legible paragraph body copy.
              </p>
            </div>
          </div>
        </div>

        {/* Domain Search Simulation */}
        <div className="glass-panel p-6 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>Domain Availability Check</span>
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
