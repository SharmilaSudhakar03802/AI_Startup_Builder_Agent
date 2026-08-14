import React, { useState, useEffect } from 'react';
import { Cpu, Key, Download, RefreshCw, Activity, Sparkles } from 'lucide-react';

export default function Header({ onOpenApiKey, onOpenExport, isGenerating, prompt, onReset }) {
  const [timeString, setTimeString] = useState('');

  // Live real-time clock indicator
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50 px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Live System Badge */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 animate-pulse-glow">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-extrabold text-2xl tracking-tight gradient-text-primary">
              VentureForge AI
            </h1>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Engine v3.0</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-medium flex items-center gap-2">
            <span>Autonomous AI Startup Generator & Pitch Orchestrator</span>
            {timeString && (
              <span className="text-[10px] font-mono text-indigo-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 hidden sm:inline">
                {timeString}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex items-center gap-3">
        {prompt && (
          <button
            onClick={onReset}
            disabled={isGenerating}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>New Startup Idea</span>
          </button>
        )}

        <button
          onClick={onOpenApiKey}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-indigo-200 transition flex items-center gap-2"
        >
          <Key className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">AI Provider</span>
        </button>

        <button
          onClick={onOpenExport}
          disabled={!prompt || isGenerating}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
            prompt && !isGenerating
              ? 'gradient-btn text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Export Blueprint</span>
        </button>
      </div>
    </header>
  );
}