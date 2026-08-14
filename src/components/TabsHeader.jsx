import React from 'react';
import { Search, Palette, Monitor, Code2, Database, Megaphone, Presentation } from 'lucide-react';

export const TABS = [
  { id: 'landing', label: 'Live Landing Page', icon: Monitor, badge: 'Interactive UI' },
  { id: 'pitchdeck', label: 'Pitch Deck Slides', icon: Presentation, badge: 'Investor Deck' },
  { id: 'validation', label: 'Market & SWOT', icon: Search, badge: 'Research Agent' },
  { id: 'branding', label: 'Brand & Identity', icon: Palette, badge: 'Branding Agent' },
  { id: 'frontend', label: 'React Frontend', icon: Code2, badge: 'Frontend Agent' },
  { id: 'backend', label: 'Backend & ERD', icon: Database, badge: 'Backend Agent' },
  { id: 'marketing', label: 'Marketing Plan', icon: Megaphone, badge: 'Growth Agent' },
];

export default function TabsHeader({ activeTab, onSelectTab }) {
  return (
    <div className="border-b border-slate-800 mb-8 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-max pb-2">
        {TABS.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-4 py-3 rounded-xl font-bold text-xs md:text-sm transition flex items-center gap-2.5 relative border ${
                isActive
                  ? 'bg-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 scale-[1.02]'
                  : 'bg-slate-950/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-500'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}