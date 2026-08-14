import React from 'react';

const AGENTS = [
  {
    id: 'validation',
    name: 'Market Validation',
    shortName: 'Validation',
    icon: '📊',
    description: 'Analyzing market demand and competition',
  },
  {
    id: 'branding',
    name: 'Brand Strategy',
    shortName: 'Branding',
    icon: '🎨',
    description: 'Creating your brand identity and positioning',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    shortName: 'Landing',
    icon: '🖥️',
    description: 'Designing your startup landing page',
  },
  {
    id: 'frontend',
    name: 'React Frontend',
    shortName: 'Frontend',
    icon: '⚛️',
    description: 'Generating the frontend application',
  },
  {
    id: 'backend',
    name: 'Backend & Database',
    shortName: 'Backend',
    icon: '🗄️',
    description: 'Building the backend and database schema',
  },
  {
    id: 'marketing',
    name: 'Marketing Strategy',
    shortName: 'Marketing',
    icon: '📣',
    description: 'Creating your launch and growth strategy',
  },
];

export default function AgentStatusRadar({
  activeAgent,
  activeStepIndex = 0,
  logs = [],
  isGenerating,
  isCompleted,
}) {
  /*
   * Try to identify the currently active agent.
   *
   * The pipeline may send either an agent ID such as
   * "validation" or a display name such as "Market Validation".
   */
  const getAgentIndex = () => {
    if (typeof activeStepIndex === 'number' && activeStepIndex >= 0) {
      return Math.min(activeStepIndex, AGENTS.length - 1);
    }

    if (!activeAgent) {
      return 0;
    }

    const activeText = String(activeAgent).toLowerCase();

    const index = AGENTS.findIndex(
      (agent) =>
        activeText.includes(agent.id) ||
        activeText.includes(agent.name.toLowerCase()) ||
        activeText.includes(agent.shortName.toLowerCase())
    );

    return index >= 0 ? index : 0;
  };

  const currentIndex = getAgentIndex();

  const getAgentStatus = (index) => {
    if (isCompleted) {
      return 'completed';
    }

    if (!isGenerating) {
      if (index < currentIndex) {
        return 'completed';
      }

      return 'waiting';
    }

    if (index < currentIndex) {
      return 'completed';
    }

    if (index === currentIndex) {
      return 'active';
    }

    return 'waiting';
  };

  const completedCount = isCompleted
    ? AGENTS.length
    : AGENTS.filter((_, index) => index < currentIndex).length;

  const progress = isCompleted
    ? 100
    : isGenerating
      ? Math.min(
          95,
          Math.round(
            ((currentIndex + 0.5) / AGENTS.length) * 100
          )
        )
      : 0;

  const currentAgent =
    AGENTS[currentIndex] || AGENTS[0];

  return (
    <section className="mb-8 w-full">

      {/* =====================================================
          MAIN STATUS CARD
      ====================================================== */}
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-black/20 backdrop-blur-xl">

        {/* Header */}
        <div className="border-b border-slate-800/80 px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Title */}
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-xl ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : isGenerating
                      ? 'border-indigo-500/30 bg-indigo-500/10'
                      : 'border-slate-700 bg-slate-800/70'
                }`}
              >
                {isCompleted ? '✓' : isGenerating ? '⚡' : '🤖'}
              </div>

              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  {isCompleted
                    ? 'Startup Generation Complete'
                    : isGenerating
                      ? 'AI Agents at Work'
                      : 'Startup Generation'}
                </h2>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {isCompleted
                    ? 'Your startup package has been generated successfully.'
                    : isGenerating
                      ? `Currently working on ${currentAgent.name}`
                      : 'Your specialized AI agents will work together here.'}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                isCompleted
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : isGenerating
                    ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                    : 'border-slate-700 bg-slate-800/70 text-slate-400'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isCompleted
                    ? 'bg-emerald-400'
                    : isGenerating
                      ? 'animate-pulse bg-indigo-400'
                      : 'bg-slate-500'
                }`}
              />

              {isCompleted
                ? 'Complete'
                : isGenerating
                  ? 'Generating'
                  : 'Ready'}
            </div>
          </div>
        </div>

        {/* =====================================================
            PROGRESS
        ====================================================== */}
        <div className="px-5 py-5 sm:px-7">

          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overall Progress
            </span>

            <span className="text-sm font-bold text-white">
              {progress}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isCompleted
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                  : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400'
              }`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>
              {completedCount} of {AGENTS.length} agents completed
            </span>

            {isGenerating && (
              <span className="text-indigo-400">
                Processing...
              </span>
            )}

            {isCompleted && (
              <span className="text-emerald-400">
                All agents completed
              </span>
            )}
          </div>
        </div>

        {/* =====================================================
            AGENT GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-3 border-t border-slate-800/80 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">

          {AGENTS.map((agent, index) => {
            const status = getAgentStatus(index);

            return (
              <div
                key={agent.id}
                className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                  status === 'active'
                    ? 'border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                    : status === 'completed'
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >

                {/* Active glow */}
                {status === 'active' && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/10 to-transparent" />
                )}

                <div className="relative flex items-start gap-3">

                  {/* Agent Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-lg ${
                      status === 'active'
                        ? 'border-indigo-500/30 bg-indigo-500/10'
                        : status === 'completed'
                          ? 'border-emerald-500/20 bg-emerald-500/10'
                          : 'border-slate-700 bg-slate-800/70'
                    }`}
                  >
                    {status === 'completed'
                      ? '✓'
                      : agent.icon}
                  </div>

                  {/* Agent Info */}
                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`truncate text-sm font-semibold ${
                          status === 'active'
                            ? 'text-indigo-200'
                            : status === 'completed'
                              ? 'text-emerald-200'
                              : 'text-slate-300'
                        }`}
                      >
                        {agent.name}
                      </h3>

                      {/* Status indicator */}
                      {status === 'active' && (
                        <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
                          Live
                        </span>
                      )}

                      {status === 'completed' && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                          Done
                        </span>
                      )}

                      {status === 'waiting' && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                          Waiting
                        </span>
                      )}
                    </div>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                      {agent.description}
                    </p>
                  </div>
                </div>

                {/* Agent state line */}
                <div className="relative mt-4">

                  {status === 'active' && (
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    </div>
                  )}

                  {status === 'completed' && (
                    <div className="h-1 w-full rounded-full bg-emerald-500/40">
                      <div className="h-full w-full rounded-full bg-emerald-500/70" />
                    </div>
                  )}

                  {status === 'waiting' && (
                    <div className="h-1 w-full rounded-full bg-slate-800" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            CURRENT ACTIVITY
        ====================================================== */}
        {(isGenerating || isCompleted) && (
          <div className="border-t border-slate-800/80 px-5 py-5 sm:px-7">

            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-base">
                  {isCompleted
                    ? '🎉'
                    : currentAgent.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {isCompleted
                      ? 'Final Status'
                      : 'Current Activity'}
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-slate-200">
                    {isCompleted
                      ? 'All startup assets are ready to explore.'
                      : currentAgent.description}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            LIVE LOGS
        ====================================================== */}
        {logs.length > 0 && (
          <div className="border-t border-slate-800/80 px-5 py-5 sm:px-7">

            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Activity Log
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Real-time agent activity
                </p>
              </div>

              <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-slate-500">
                {logs.length} events
              </span>
            </div>

            <div className="max-h-48 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/70 p-3">

              <div className="space-y-2">
                {logs.slice(-8).map((log, index) => (
                  <div
                    key={`${log}-${index}`}
                    className="flex items-start gap-3 rounded-xl px-3 py-2 text-xs transition hover:bg-slate-900"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />

                    <span className="leading-5 text-slate-400">
                      {log}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}