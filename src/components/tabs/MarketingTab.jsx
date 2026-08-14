import React, { useMemo, useState } from 'react';
import {
  Megaphone,
  CalendarDays,
  Target,
  Users,
  Copy,
  Check,
  TrendingUp,
  ChevronDown,
  Hash,
  Rocket,
  MessageSquare,
} from 'lucide-react';

export default function MarketingTab({ data }) {
  const [activeWeek, setActiveWeek] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const marketing = data.marketing || {};

  const plan =
    marketing.plan ||
    marketing.marketingPlan ||
    marketing.strategy ||
    [];

  const campaigns =
    marketing.campaigns ||
    marketing.channels ||
    [];

  const content =
    marketing.contentIdeas ||
    marketing.content ||
    [];

  const goals =
    marketing.goals ||
    marketing.kpis ||
    [];

  const weeklyPlan = useMemo(() => {
    if (Array.isArray(plan)) return plan;

    if (typeof plan === 'object' && plan !== null) {
      return Object.entries(plan).map(([key, value]) => ({
        week: key,
        activities: Array.isArray(value) ? value : [value],
      }));
    }

    return [];
  }, [plan]);

  const handleCopyPlan = async () => {
    const text = createMarketingText(
      weeklyPlan,
      campaigns,
      content
    );

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="space-y-6 pb-10">

      {/* Hero */}
      <section className="glass-panel overflow-hidden">

        <div className="relative p-6 md:p-8">

          <div className="pointer-events-none absolute right-0 top-0 opacity-10">
            <Megaphone className="h-52 w-52 text-pink-400" />
          </div>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-500/10 ring-1 ring-pink-500/20">
                <Megaphone className="h-6 w-6 text-pink-400" />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-xl font-bold text-white">
                    Marketing Command Center
                  </h2>

                  <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-pink-400">
                    30-Day Plan
                  </span>

                </div>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Turn your startup idea into a focused launch strategy
                  with campaigns, content, customer acquisition and growth goals.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={handleCopyPlan}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-pink-500/50 hover:bg-slate-800 hover:text-white"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}

              {copied ? 'Plan Copied!' : 'Copy Marketing Plan'}
            </button>

          </div>

        </div>
      </section>

      {/* Overview */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">

        <StatCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Duration"
          value="30 Days"
        />

        <StatCard
          icon={<Target className="h-4 w-4" />}
          label="Campaigns"
          value={campaigns.length || '—'}
        />

        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="Audience"
          value="Targeted"
        />

        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Focus"
          value="Growth"
        />

      </section>

      {/* Goals */}
      {goals.length > 0 && (
        <section>

          <SectionTitle
            icon={<Target className="h-5 w-5 text-amber-400" />}
            title="Growth Objectives"
            description="The key outcomes your marketing strategy is designed to achieve."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

            {goals.map((goal, index) => {

              const title =
                typeof goal === 'string'
                  ? goal
                  : goal.name ||
                    goal.title ||
                    goal.metric ||
                    `Goal ${index + 1}`;

              const value =
                typeof goal === 'object'
                  ? goal.target ||
                    goal.value ||
                    goal.goal ||
                    ''
                  : '';

              return (
                <div
                  key={index}
                  className="glass-panel p-5 transition hover:-translate-y-0.5 hover:border-amber-500/30"
                >

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Target className="h-4 w-4" />
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {title}
                  </h3>

                  {value && (
                    <p className="mt-2 text-lg font-extrabold text-amber-300">
                      {value}
                    </p>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* 30 Day Timeline */}
      <section>

        <SectionTitle
          icon={<CalendarDays className="h-5 w-5 text-indigo-400" />}
          title="30-Day Launch Roadmap"
          description="A step-by-step execution plan for taking your startup from idea to market."
        />

        {weeklyPlan.length > 0 ? (
          <div className="glass-panel overflow-hidden">

            {/* Week selector */}
            <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-900/30">

              {weeklyPlan.map((item, index) => {

                const weekLabel =
                  item.week ||
                  item.title ||
                  `Week ${index + 1}`;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveWeek(index)}
                    className={`min-w-[120px] border-b-2 px-5 py-4 text-xs font-bold transition ${
                      activeWeek === index
                        ? 'border-indigo-400 bg-indigo-500/10 text-indigo-300'
                        : 'border-transparent text-slate-500 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {weekLabel}
                  </button>
                );
              })}

            </div>

            {/* Selected week */}
            <div className="p-6">

              {(() => {
                const item = weeklyPlan[activeWeek];

                const activities =
                  item?.activities ||
                  item?.tasks ||
                  item?.actions ||
                  item?.items ||
                  [];

                const normalizedActivities = Array.isArray(activities)
                  ? activities
                  : [activities];

                return (
                  <div className="space-y-3">

                    {item?.description && (
                      <p className="mb-5 text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    )}

                    {normalizedActivities.map((activity, index) => {

                      const text =
                        typeof activity === 'string'
                          ? activity
                          : activity.title ||
                            activity.task ||
                            activity.action ||
                            activity.description ||
                            JSON.stringify(activity);

                      return (
                        <div
                          key={index}
                          className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-indigo-500/30 hover:bg-slate-900"
                        >

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-300">
                            {index + 1}
                          </div>

                          <div className="flex-1">

                            <p className="text-sm leading-6 text-slate-300">
                              {text}
                            </p>

                          </div>

                          <Check className="mt-1 h-4 w-4 text-slate-700 transition group-hover:text-emerald-400" />

                        </div>
                      );
                    })}

                  </div>
                );
              })()}

            </div>
          </div>
        ) : (
          <EmptyState
            icon={<CalendarDays className="h-7 w-7" />}
            title="Marketing roadmap not available"
            description="Generate your startup package to create the 30-day marketing plan."
          />
        )}

      </section>

      {/* Campaigns */}
      {campaigns.length > 0 && (
        <section>

          <SectionTitle
            icon={<Rocket className="h-5 w-5 text-pink-400" />}
            title="Acquisition Channels"
            description="Recommended channels and campaigns for reaching your target customers."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

            {campaigns.map((campaign, index) => {

              const title =
                typeof campaign === 'string'
                  ? campaign
                  : campaign.name ||
                    campaign.title ||
                    campaign.channel ||
                    `Campaign ${index + 1}`;

              const description =
                typeof campaign === 'object'
                  ? campaign.description ||
                    campaign.strategy ||
                    campaign.details ||
                    ''
                  : '';

              const platform =
                typeof campaign === 'object'
                  ? campaign.platform ||
                    campaign.channel ||
                    ''
                  : '';

              return (
                <div
                  key={index}
                  className="glass-panel group p-5 transition hover:-translate-y-1 hover:border-pink-500/30"
                >

                  <div className="mb-4 flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                      <Megaphone className="h-5 w-5" />
                    </div>

                    {platform && (
                      <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-slate-400">
                        {platform}
                      </span>
                    )}

                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {title}
                  </h3>

                  {description && (
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {description}
                    </p>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* Content Ideas */}
      {content.length > 0 && (
        <section>

          <SectionTitle
            icon={<MessageSquare className="h-5 w-5 text-cyan-400" />}
            title="Content Ideas"
            description="Content concepts you can turn into social posts, articles, videos or campaigns."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {content.map((item, index) => {

              const title =
                typeof item === 'string'
                  ? item
                  : item.title ||
                    item.topic ||
                    item.idea ||
                    `Content Idea ${index + 1}`;

              const description =
                typeof item === 'object'
                  ? item.description ||
                    item.format ||
                    item.angle ||
                    ''
                  : '';

              return (
                <div
                  key={index}
                  className="glass-panel flex gap-4 p-5 transition hover:border-cyan-500/30"
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Hash className="h-4 w-4" />
                  </div>

                  <div>

                    <h3 className="text-sm font-bold text-white">
                      {title}
                    </h3>

                    {description && (
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {description}
                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 md:p-8">

        <div className="pointer-events-none absolute right-0 top-0 opacity-10">
          <TrendingUp className="h-40 w-40 text-indigo-400" />
        </div>

        <div className="relative max-w-2xl">

          <div className="mb-3 flex items-center gap-2">

            <Rocket className="h-5 w-5 text-indigo-400" />

            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Execution Mindset
            </span>

          </div>

          <h3 className="text-xl font-bold text-white">
            Build, measure, learn and iterate.
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Your marketing plan is a starting point. Track your acquisition
            metrics, identify the strongest channels and continuously improve
            your messaging based on real customer feedback.
          </p>

        </div>

      </section>

    </div>
  );
}

/* ============================================================
   Reusable Components
============================================================ */

function StatCard({ icon, label, value }) {
  return (
    <div className="glass-panel p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {label}
          </p>

          <p className="mt-0.5 truncate text-sm font-bold text-white">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

function SectionTitle({ icon, title, description }) {
  return (
    <div className="mb-4">

      <div className="flex items-center gap-2">

        {icon}

        <h3 className="text-lg font-bold text-white">
          {title}
        </h3>

      </div>

      {description && (
        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      )}

    </div>
  );
}

function EmptyState({ icon, title, description }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center p-12 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-600">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
}

/* ============================================================
   Copy helper
============================================================ */

function createMarketingText(plan, campaigns, content) {
  const sections = [];

  if (plan.length) {
    sections.push(
      `30-DAY MARKETING PLAN\n\n${plan
        .map((item, index) => {
          const title =
            item.week ||
            item.title ||
            `Week ${index + 1}`;

          const activities =
            item.activities ||
            item.tasks ||
            item.actions ||
            item.items ||
            [];

          const list = Array.isArray(activities)
            ? activities
            : [activities];

          return `${title}\n${list
            .map((activity) => {
              if (typeof activity === 'string') return `- ${activity}`;

              return `- ${
                activity.title ||
                activity.task ||
                activity.action ||
                activity.description ||
                ''
              }`;
            })
            .join('\n')}`;
        })
        .join('\n\n')}`
    );
  }

  if (campaigns.length) {
    sections.push(
      `ACQUISITION CHANNELS\n\n${campaigns
        .map((campaign) =>
          typeof campaign === 'string'
            ? `- ${campaign}`
            : `- ${
                campaign.name ||
                campaign.title ||
                campaign.channel ||
                ''
              }`
        )
        .join('\n')}`
    );
  }

  if (content.length) {
    sections.push(
      `CONTENT IDEAS\n\n${content
        .map((item) =>
          typeof item === 'string'
            ? `- ${item}`
            : `- ${
                item.title ||
                item.topic ||
                item.idea ||
                ''
              }`
        )
        .join('\n')}`
    );
  }

  return sections.join('\n\n');
}