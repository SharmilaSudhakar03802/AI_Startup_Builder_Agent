import React from 'react';
import { ShieldAlert, TrendingUp, Users, CheckCircle, AlertTriangle, Lightbulb, Target } from 'lucide-react';

export default function ValidationTab({ data }) {
  if (!data) return null;
  const { meta, validation } = data;

  return (
    <div className="space-y-8">
      {/* Top Feasibility & TAM Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feasibility Gauge */}
        <div className="glass-panel p-6 border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Feasibility Score</h3>
              <Target className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-5xl font-extrabold text-white">{meta.feasibilityScore}</span>
              <span className="text-slate-400 font-bold">/ 100</span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              High Viability Commercial Potential
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            Based on market growth rate, unit margins & competitive density.
          </div>
        </div>

        {/* Market Category & TAM */}
        <div className="glass-panel p-6 border border-purple-500/30 md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Addressable Market (TAM)</h3>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl md:text-3xl font-extrabold gradient-text-primary mb-2">
              {meta.estimatedTAM}
            </p>
            <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-lg mb-3">
              {meta.marketCategory}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {validation.summary}
            </p>
          </div>
        </div>
      </div>

      {/* SWOT Analysis Matrix */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <span>Strategic SWOT Analysis</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="glass-panel p-5 border-l-4 border-l-emerald-500">
            <h4 className="font-bold text-emerald-400 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Key Strengths
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {validation.swot.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="glass-panel p-5 border-l-4 border-l-rose-500">
            <h4 className="font-bold text-rose-400 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Weaknesses & Bottlenecks
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {validation.swot.weaknesses.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="glass-panel p-5 border-l-4 border-l-cyan-500">
            <h4 className="font-bold text-cyan-400 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Market Opportunities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {validation.swot.opportunities.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="glass-panel p-5 border-l-4 border-l-amber-500">
            <h4 className="font-bold text-amber-400 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Competitive Threats
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {validation.swot.threats.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Target User Personas */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <span>Target Customer Personas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {validation.personas.map((persona, i) => (
            <div key={i} className="glass-panel p-6 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-3xl flex items-center justify-center">
                  {persona.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">{persona.name}</h4>
                  <p className="text-xs text-indigo-400 font-semibold">{persona.role}</p>
                  <p className="text-xs text-slate-400">{persona.age} yrs • {persona.location}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Core Pain Points</h5>
                  <ul className="space-y-1">
                    {persona.painPoints.map((pt, j) => (
                      <li key={j} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-rose-400">✕</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Primary Buying Trigger</h5>
                  <p className="text-xs text-slate-200 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                    💡 {persona.buyingTrigger}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
