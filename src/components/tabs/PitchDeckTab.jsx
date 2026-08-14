import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Sparkles, TrendingUp, ShieldCheck, DollarSign, Cpu, CheckCircle } from 'lucide-react';

export default function PitchDeckTab({ data }) {
  if (!data) return null;
  const { branding, validation, landingPageData, meta, backendArtifacts } = data;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    // Slide 1: Title & Vision
    {
      title: 'Company Overview & Vision',
      badge: 'Slide 1 — Elevator Pitch',
      content: (
        <div className="text-center py-10 max-w-3xl mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white shadow-2xl">
            {branding.brandName.toLowerCase().includes('bakery') ? '🥐' : '⚡'}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            {branding.brandName}
          </h1>
          <p className="text-xl text-indigo-300 font-medium max-w-2xl mx-auto">
            "{branding.tagline}"
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs font-semibold text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Category: {meta.marketCategory}</span>
          </div>
        </div>
      )
    },
    // Slide 2: The Problem
    {
      title: 'The Problem & Market Pain',
      badge: 'Slide 2 — Pain Points',
      content: (
        <div className="space-y-6 py-4">
          <p className="text-lg text-slate-300">
            Target consumers face major friction and quality trade-offs in today's fragmented market:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validation.personas[0]?.painPoints.map((pain, i) => (
              <div key={i} className="glass-panel p-5 border-l-4 border-l-rose-500 flex items-start gap-3">
                <span className="text-rose-400 font-bold text-lg">✕</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Market Friction #{i + 1}</h4>
                  <p className="text-xs text-slate-300 mt-1">{pain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 3: The Solution
    {
      title: 'Our Solution & Unique Proposition',
      badge: 'Slide 3 — Value Prop',
      content: (
        <div className="space-y-6 py-4">
          <h3 className="text-2xl font-bold text-white">{landingPageData.heroHeading}</h3>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {landingPageData.heroSubtext}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {landingPageData.features.map((feat, idx) => (
              <div key={idx} className="glass-panel p-4 border border-emerald-500/30">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{feat.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 4: Market Size (TAM)
    {
      title: 'Market Opportunity & Growth',
      badge: 'Slide 4 — TAM / SAM',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
          <div className="glass-panel p-6 border border-purple-500/30 text-center flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Total Addressable Market</span>
            <p className="text-4xl font-extrabold gradient-text-primary mt-2">{meta.estimatedTAM}</p>
            <p className="text-xs text-slate-400 mt-2">Global Market Category Potential</p>
          </div>

          <div className="glass-panel p-6 border border-indigo-500/30 text-center flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Feasibility Score</span>
            <p className="text-4xl font-extrabold text-white mt-2">{meta.feasibilityScore} / 100</p>
            <p className="text-xs text-emerald-400 font-semibold mt-2">High Viability Rating</p>
          </div>

          <div className="glass-panel p-6 border border-cyan-500/30 text-center flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Target Customer Persona</span>
            <p className="text-xl font-bold text-white mt-2">{validation.personas[0]?.name}</p>
            <p className="text-xs text-slate-400 mt-1">{validation.personas[0]?.role}</p>
          </div>
        </div>
      )
    },
    // Slide 5: Business Model & Monetization
    {
      title: 'Business Model & Unit Economics',
      badge: 'Slide 5 — Monetization',
      content: (
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {landingPageData.products.map((p, idx) => (
              <div key={idx} className="glass-panel p-5 border border-amber-500/30 text-center">
                <div className="text-4xl mb-2">{p.image}</div>
                <h4 className="font-bold text-white text-sm mb-1">{p.name}</h4>
                <p className="text-amber-400 font-extrabold text-lg mb-2">{p.price}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
                  {p.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 6: Technology Architecture
    {
      title: 'Tech Stack & Data Architecture',
      badge: 'Slide 6 — Engineering',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
          <div className="glass-panel p-5 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-bold mb-3 text-sm">
              <Cpu className="w-4 h-4" />
              <span>Frontend Architecture</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• React 18 SPA + Vite</li>
              <li>• Tailwind CSS Design Tokens</li>
              <li>• Lucide React + Glassmorphic UI</li>
            </ul>
          </div>

          <div className="glass-panel p-5 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-3 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Database & Cloud Backend</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Supabase PostgreSQL Database</li>
              <li>• Row Level Security (RLS) Policies</li>
              <li>• Prisma ORM Type Definitions</li>
            </ul>
          </div>

          <div className="glass-panel p-5 border border-slate-800">
            <div className="flex items-center gap-2 text-purple-400 font-bold mb-3 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>AI Agents Orchestration</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Google Gemini AI API Pipeline</li>
              <li>• Multi-Agent Step Streaming</li>
              <li>• Automated Pitch Package Export</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-8 overflow-y-auto' : ''}`}>
      {/* Pitch Deck Top Controls */}
      <div className="glass-panel p-4 flex items-center justify-between border border-indigo-500/30">
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold uppercase px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
            {slides[currentSlide].badge}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition ml-2"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Viewer Canvas */}
      <div className="glass-panel p-8 min-h-[460px] border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden bg-slate-900/90 shadow-2xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight border-b border-slate-800 pb-4">
            {slides[currentSlide].title}
          </h2>
          {slides[currentSlide].content}
        </div>

        {/* Slide Footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>{branding.brandName} — Pitch Deck Confidential</span>
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
