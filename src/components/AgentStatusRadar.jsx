import React from 'react';
import { AGENT_TYPES } from '../agents/agentEngine';
import { Search, Palette, Layout, Code2, Database, Megaphone, CheckCircle2, Loader2, Bot } from 'lucide-react';

const ICON_MAP = {
  Search,
  Palette,
  Layout,
  Code2,
  Database,
  Megaphone
};

export default function AgentStatusRadar({ activeAgent, activeStepIndex, logs, isGenerating, isCompleted }) {
  const agentsList = Object.values(AGENT_TYPES);

  return (
    <div className="glass-panel p-6 mb-8 border border-indigo-500/20 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Autonomous Agent Ensemble Radar
              {isGenerating && (
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">
              5 Specialized AI Agents working collaboratively to build your startup
            </p>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full sm:w-48 bg-slate-800/80 rounded-full h-2.5 p-0.5 overflow-hidden border border-slate-700">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
            style={{
              width: isCompleted
                ? '100%'
                : `${Math.round(((activeStepIndex || 0) / agentsList.length) * 100)}%`
            }}
          />
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {agentsList.map((agent, idx) => {
          const IconComponent = ICON_MAP[agent.iconName] || Bot;
          const isCurrentActive = activeAgent?.id === agent.id;
          const isDone = isCompleted || (activeStepIndex > idx);

          return (
            <div
              key={agent.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-slate-800/90 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.03]'
                  : isDone
                  ? 'bg-slate-900/80 border-slate-700/60 opacity-90'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: `${agent.color}25`, color: agent.color }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrentActive ? (
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <h3 className="font-bold text-xs text-white tracking-tight">{agent.name}</h3>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">{agent.role}</p>
              </div>

              <div className="mt-3">
                <span
                  className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full inline-block ${
                    isDone
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : isCurrentActive
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? 'Complete' : isCurrentActive ? 'Processing' : 'Queued'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Agent Terminal Logs */}
      {logs && logs.length > 0 && (
        <div className="code-container p-3 max-h-24 overflow-y-auto text-xs font-mono text-slate-300 space-y-1">
          {logs.slice(-3).map((logMsg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold">&gt;</span>
              <span>{logMsg}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
