import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, Users, CheckCircle, AlertTriangle, Lightbulb, Target, DollarSign, Calculator, Sliders } from 'lucide-react';

export default function ValidationTab({ data }) {
  if (!data) return null;
  const { meta, validation } = data;

  // Real-Time Financial Projection Calculator State
  const [monthlyOrders, setMonthlyOrders] = useState(850);
  const [avgOrderValue, setAvgOrderValue] = useState(28);

  const calculateMRR = monthlyOrders * avgOrderValue;
  const calculateARR = calculateMRR * 12;
  const grossProfitMargin = Math.round(calculateMRR * 0.72);

  return (
    <div className="space-y-8">
      {/* Top Feasibility & TAM Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feasibility Score Gauge */}
        <div className="glass-panel p-6 border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Feasibility Rating</h3>
              <Target className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-extrabold text-white">{meta.feasibilityScore}</span>
              <span className="text-slate-400 font-bold text-lg">/ 100</span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold mt-3 flex items-center gap-1.5 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
              <span>High Commercial Viability Approved</span>
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            Validated against market growth rate, gross margins & unit acquisition cost.
          </div>
        </div>

        {/* Addressable Market Card */}
        <div className="glass-panel p-6 border border-purple-500/30 md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Total Addressable Market (TAM)</h3>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold gradient-text-primary mb-3 tracking-tight">
              {meta.estimatedTAM}
            </p>
            <div className="inline-block px-3 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-lg mb-3">
              Category: {meta.marketCategory}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {validation.summary}
            </p>
          </div>
        </div>
      </div>

      {/* REAL-TIME INTERACTIVE FINANCIAL CALCULATOR */}
      <div className="glass-panel p-6 border border-emerald-500/30 bg-slate-900/90">
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Real-Time 12-Month Financial Projection Simulator
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Live Model</span>
              </h3>
              <p className="text-xs text-slate-400">Drag sliders to project revenue, MRR, ARR, and gross margins in real-time</p>
            </div>
          </div>
        </div>

        {/* Calculator Sliders & Live Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sliders Input Column */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  Monthly Active Orders / Subscriptions:
                </span>
                <span className="text-emerald-400 font-mono text-sm">{monthlyOrders.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Average Order Value (AOV):
                </span>
                <span className="text-emerald-400 font-mono text-sm">${avgOrderValue}.00</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="1"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Calculation Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Projected MRR</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">${calculateMRR.toLocaleString()}</p>
              <span className="text-[10px] text-slate-500">Monthly Recurring</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Projected ARR</span>
              <p className="text-2xl font-extrabold text-indigo-400 mt-1 font-mono">${calculateARR.toLocaleString()}</p>
              <span className="text-[10px] text-slate-500">Annual Run-Rate</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gross Margin (72%)</span>
              <p className="text-xl font-bold text-white mt-1 font-mono">${grossProfitMargin.toLocaleString()}/mo</p>
              <span className="text-[10px] text-slate-500">Est. Profit Contribution</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">LTV / CAC Ratio</span>
              <p className="text-xl font-bold text-purple-400 mt-1 font-mono">4.8x</p>
              <span className="text-[10px] text-emerald-400 font-semibold">Healthy Unit Scaling</span>
            </div>
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
          <div className="glass-panel p-5 border-l-4 border-l-emerald-500">
            <h4 className="font-bold text-emerald-400 text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Core Strengths
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

          <div className="glass-panel p-5 border-l-4 border-l-rose-500">
            <h4 className="font-bold text-rose-400 text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
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

          <div className="glass-panel p-5 border-l-4 border-l-cyan-500">
            <h4 className="font-bold text-cyan-400 text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
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

          <div className="glass-panel p-5 border-l-4 border-l-amber-500">
            <h4 className="font-bold text-amber-400 text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
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

      {/* Target Personas */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <span>Target Customer Personas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {validation.personas.map((persona, i) => (
            <div key={i} className="glass-panel p-6 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-3xl flex items-center justify-center shadow-lg">
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