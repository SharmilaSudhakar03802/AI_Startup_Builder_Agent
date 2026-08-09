import React from 'react';
import { Sparkles, Key, Download, Cpu, RefreshCw, Zap } from 'lucide-react';

export default function Header({ onOpenApiKey, onOpenExport, isGenerating, prompt, onReset }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-pulse-glow">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-xl tracking-tight gradient-text-primary">
              VentureForge AI
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full badge-indigo">
              Multi-Agent v2.5
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Autonomous Startup Builder & Product Launch Ensemble
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {prompt && (
          <button
            onClick={onReset}
            disabled={isGenerating}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>New Idea</span>
          </button>
        )}

        <button
          onClick={onOpenApiKey}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-indigo-200 transition flex items-center gap-1.5"
        >
          <Key className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Provider</span>
        </button>

        <button
          onClick={onOpenExport}
          disabled={!prompt || isGenerating}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            prompt && !isGenerating
              ? 'gradient-btn text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Package</span>
        </button>
      </div>
    </header>
  );
}
