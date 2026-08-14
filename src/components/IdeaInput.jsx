import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb, Croissant, Code, Coffee, Dog, Zap, Wand2 } from 'lucide-react';

const PRESET_IDEAS = [
  {
    icon: Croissant,
    label: 'Online Bakery',
    category: 'Food & DTC',
    prompt: 'I want to start an online bakery delivering organic sourdough and french pastries fresh daily.'
  },
  {
    icon: Code,
    label: 'AI Code Reviewer',
    category: 'AI & Developer SaaS',
    prompt: 'An autonomous AI developer agent that reviews pull requests, detects vulnerabilities, and merges code.'
  },
  {
    icon: Coffee,
    label: 'Eco Coffee Club',
    category: 'Subscription Commerce',
    prompt: 'A zero-waste artisanal coffee subscription box with 100% compostable brew pods and fair-trade beans.'
  },
  {
    icon: Dog,
    label: 'On-Demand Pet Care',
    category: 'Mobile Marketplace',
    prompt: 'A mobile marketplace connecting pet owners with background-checked local dog walkers and pet sitters.'
  },
  {
    icon: Zap,
    label: 'B2B LeadGen Bot',
    category: 'Enterprise Sales Tech',
    prompt: 'Automated AI lead enrichment tool that identifies verified B2B decision-maker emails and LinkedIn profiles.'
  }
];

export default function IdeaInput({ onSubmitIdea, isGenerating }) {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    onSubmitIdea(inputText.trim());
  };

  const handleSelectPreset = (presetPrompt) => {
    setInputText(presetPrompt);
    onSubmitIdea(presetPrompt);
  };

  // Enhance simple prompt with AI suggestions
  const handleEnhancePrompt = () => {
    if (!inputText.trim()) {
      setInputText('I want to launch a premium direct-to-consumer artisanal online bakery delivering organic sourdough bread and French pastries within 2 hours.');
      return;
    }
    const clean = inputText.trim();
    if (!clean.toLowerCase().includes('delivering') && !clean.toLowerCase().includes('subscription')) {
      setInputText(`${clean} featuring recurring subscriptions, same-day delivery, and custom order builder.`);
    }
  };

  const categories = ['All', 'Food & DTC', 'AI & Developer SaaS', 'Subscription Commerce', 'Mobile Marketplace', 'Enterprise Sales Tech'];

  const filteredPresets = selectedCategory === 'All'
    ? PRESET_IDEAS
    : PRESET_IDEAS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto py-12 text-center space-y-8">
      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-lg">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
        <span>Real-Time Autonomous Startup Architect Engine</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          What startup do you want to <span className="gradient-text-primary">build today?</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Enter your raw idea. 5 specialized AI agents will instantly research, validate, brand, design, generate React code, build database schemas, and create your 30-day marketing plan.
        </p>
      </div>

      {/* Real-Time Prompt Form */}
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
        <div className="glass-panel p-3 flex flex-wrap sm:flex-nowrap items-center gap-3 shadow-2xl focus-within:border-indigo-500 transition-all">
          <div className="pl-3 text-amber-400">
            <Lightbulb className="w-6 h-6" />
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='e.g., "I want to start an online bakery."'
            className="w-full bg-transparent border-0 text-white placeholder-slate-500 focus:outline-none text-base md:text-lg py-3 px-2 font-medium"
            disabled={isGenerating}
          />

          {/* AI Enhancer Button */}
          <button
            type="button"
            onClick={handleEnhancePrompt}
            title="Auto-Expand Prompt with AI details"
            className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-purple-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Enhance</span>
          </button>

          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className={`px-7 py-4 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition whitespace-nowrap ${
              inputText.trim() && !isGenerating
                ? 'gradient-btn text-white shadow-xl shadow-indigo-500/35 scale-[1.02]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isGenerating ? 'Agents Building...' : 'Build My Startup'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Character Count & Tip */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-4">
          <span>💡 Tip: Add target market details for even richer agent results</span>
          <span>{inputText.length} characters</span>
        </div>
      </form>

      {/* Category Filters & Quick Presets */}
      <div className="space-y-4 pt-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-3xl mx-auto text-left">
          {filteredPresets.map((preset, idx) => {
            const IconComp = preset.icon;
            return (
              <div
                key={idx}
                onClick={() => handleSelectPreset(preset.prompt)}
                className="glass-panel p-4 glass-panel-hover cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-amber-400 border border-indigo-500/20 group-hover:scale-110 transition">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {preset.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition mb-1">
                    {preset.label}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    "{preset.prompt}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Launch Preset</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}