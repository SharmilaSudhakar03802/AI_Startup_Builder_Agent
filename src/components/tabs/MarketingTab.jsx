import React, { useState } from 'react';
import { Megaphone, Calendar, Share2, CheckSquare, Sparkles } from 'lucide-react';

export default function MarketingTab({ data }) {
  if (!data) return null;
  const { marketing } = data;
  const [checkedTasks, setCheckedTasks] = useState({});

  const toggleCheck = (idx) => {
    setCheckedTasks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8">
      {/* GTM Marketing Channels Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-purple-400" />
          <span>Go-To-Market (GTM) Priority Channels</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketing.goToMarketChannels.map((chan, i) => (
            <div key={i} className="glass-panel p-5 border border-slate-800 hover:border-purple-500/40 transition">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-purple-500/10 text-purple-300 rounded-full mb-2 inline-block">
                Channel #{i + 1}
              </span>
              <h4 className="font-bold text-base text-white mb-1">{chan.channel}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{chan.focus}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Ad Copy Variants */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-pink-400" />
          <span>High-Converting Ad Copy Hooks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketing.adCopyVariants.map((ad, i) => (
            <div key={i} className="glass-panel p-6 border border-pink-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded mb-3 inline-block">
                  Variant B-{i + 1}
                </span>
                <h4 className="font-bold text-lg text-white mb-3">{ad.headline}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  "{ad.body}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">Call To Action:</span>
                <span className="px-3 py-1 bg-pink-500 text-white rounded-lg text-xs font-bold shadow-md shadow-pink-500/20">
                  {ad.cta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Launch Roadmap */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <span>30-Day Launch Content & Execution Plan</span>
        </h3>

        <div className="glass-panel p-6 border border-slate-800 space-y-4">
          {marketing.thirtyDayCalendar.map((item, i) => (
            <div
              key={i}
              onClick={() => toggleCheck(i)}
              className={`p-4 rounded-xl border transition flex items-start gap-4 cursor-pointer ${
                checkedTasks[i]
                  ? 'bg-emerald-500/10 border-emerald-500/30 opacity-75'
                  : 'bg-slate-900/70 border-slate-800 hover:border-indigo-500/40'
              }`}
            >
              <div className={`mt-0.5 p-1 rounded-md border ${
                checkedTasks[i] ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-600 text-transparent'
              }`}>
                <CheckSquare className="w-4 h-4" />
              </div>

              <div>
                <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">{item.day}</span>
                <p className={`text-xs text-white font-medium mt-0.5 ${checkedTasks[i] ? 'line-through text-slate-400' : ''}`}>
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
