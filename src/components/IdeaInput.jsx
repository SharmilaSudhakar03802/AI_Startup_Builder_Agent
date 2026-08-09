import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb, Croissant, Code, Coffee, Dog, Zap } from 'lucide-react';

const PRESET_IDEAS = [
  {
    icon: Croissant,
    label: 'Online Bakery',
    prompt: 'I want to start an online bakery delivering fresh sourdough and pastries daily.'
  },
  {
    icon: Code,
    label: 'AI Code Reviewer',
    prompt: 'An AI autonomous developer bot that reviews pull requests and catches bugs instantly.'
  },
  {
    icon: Coffee,
    label: 'Eco Coffee Club',
    prompt: 'A zero-waste artisanal coffee subscription box with compostable pods.'
  },
  {
    icon: Dog,
    label: 'On-Demand Pet Care',
    prompt: 'A mobile marketplace for vetted local dog walkers and pet care specialists.'
  },
  {
    icon: Zap,
    label: 'B2B LeadGen Bot',
    prompt: 'Automated AI lead enrichment tool that finds verified executive contact details.'
  }
];

export default function IdeaInput({ onSubmitIdea, isGenerating }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    onSubmitIdea(inputText.trim());
  };

  const handleSelectPreset = (presetPrompt) => {
    setInputText(presetPrompt);
    onSubmitIdea(presetPrompt);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6">
        <Sparkles className="w-4 h-4" />
        <span>Turn Any Idea into a Complete Launchable Startup in Seconds</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
        What startup do you want to <span className="gradient-text-primary">build today?</span>
      </h1>

      <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
        Enter your raw idea. 5 specialized AI agents will generate your market validation, brand identity, color palette, landing page UI, React frontend code, PostgreSQL database schema, and 30-day marketing plan.
      </p>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="glass-panel p-2 flex items-center gap-2 max-w-3xl mx-auto shadow-2xl focus-within:border-indigo-500">
          <div className="pl-4 text-slate-400">
            <Lightbulb className="w-6 h-6 text-amber-400" />
          </div>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='e.g., "I want to start an online bakery."'
            className="w-full bg-transparent border-0 text-white placeholder-slate-500 focus:outline-none text-base md:text-lg py-3 px-2 font-medium"
            disabled={isGenerating}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className={`px-6 py-3.5 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition whitespace-nowrap ${
              inputText.trim() && !isGenerating
                ? 'gradient-btn text-white shadow-xl shadow-indigo-500/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isGenerating ? 'Agents Orchestrating...' : 'Build My Startup'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-slate-500 mr-2">Quick Presets:</span>
        {PRESET_IDEAS.map((preset, idx) => {
          const IconComp = preset.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset.prompt)}
              disabled={isGenerating}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white text-xs font-medium transition flex items-center gap-2 group"
            >
              <IconComp className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
