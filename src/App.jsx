import React, { useState } from 'react';

import Header from './components/Header';
import IdeaInput from './components/IdeaInput';
import AgentStatusRadar from './components/AgentStatusRadar';
import TabsHeader from './components/TabsHeader';

import ValidationTab from './components/tabs/ValidationTab';
import BrandingTab from './components/tabs/BrandingTab';
import LandingPageTab from './components/tabs/LandingPageTab';
import PitchDeckTab from './components/tabs/PitchDeckTab';
import CodeViewTab from './components/tabs/CodeViewTab';
import BackendTab from './components/tabs/BackendTab';
import MarketingTab from './components/tabs/MarketingTab';

import ApiKeyModal from './components/ApiKeyModal';
import ExportModal from './components/ExportModal';

import { runAgentPipeline } from './agents/agentEngine';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [activeAgent, setActiveAgent] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const [logs, setLogs] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const [startupData, setStartupData] = useState(null);
  const [activeTab, setActiveTab] = useState('landing');

  const [apiKey, setApiKey] = useState('');
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // --------------------------------------------------
  // START AGENT PIPELINE
  // --------------------------------------------------

  const handleStartPipeline = async (userPrompt) => {
    setPrompt(userPrompt);
    setIsGenerating(true);
    setIsCompleted(false);

    setLogs([]);
    setActiveStepIndex(0);
    setActiveAgent(null);
    setStartupData(null);

    try {
      const packageData = await runAgentPipeline(
        userPrompt,
        apiKey,
        (progress) => {
          setActiveStepIndex(progress.activeStepIndex);
          setActiveAgent(progress.activeAgent);

          if (progress.log) {
            setLogs((prev) => [...prev, progress.log]);
          }
        }
      );

      console.log('Generated startup data:', packageData);

      setStartupData(packageData);
      setIsCompleted(true);

      // Open landing page automatically after generation
      setActiveTab('landing');
    } catch (err) {
      console.error('Agent pipeline error:', err);

      setLogs((prev) => [
        ...prev,
        '❌ Pipeline failed. Please try again.'
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // --------------------------------------------------
  // RESET
  // --------------------------------------------------

  const handleReset = () => {
    setPrompt('');
    setStartupData(null);

    setIsGenerating(false);
    setIsCompleted(false);

    setLogs([]);
    setActiveStepIndex(0);
    setActiveAgent(null);

    setActiveTab('landing');
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">

      {/* HEADER */}
      <Header
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isGenerating={isGenerating}
        prompt={prompt}
        onReset={handleReset}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-10">

        <div className="mx-auto w-full max-w-6xl">

          {/* STEP 1 — IDEA INPUT */}

          {!prompt ? (
            <IdeaInput
              onSubmitIdea={handleStartPipeline}
              isGenerating={isGenerating}
            />
          ) : (

            /* STEP 2 — AGENT MONITOR + RESULTS */

            <div className="space-y-8">

              {/* AGENT STATUS */}
              <AgentStatusRadar
                activeAgent={activeAgent}
                activeStepIndex={activeStepIndex}
                logs={logs}
                isGenerating={isGenerating}
                isCompleted={isCompleted}
              />

              {/* GENERATED STARTUP */}
              {startupData && (
                <div className="animate-fadeIn">

                  {/* TABS */}
                  <TabsHeader
                    activeTab={activeTab}
                    onSelectTab={(tabId) => setActiveTab(tabId)}
                  />

                  {/* TAB CONTENT */}
                  <div className="mt-6">

                    {activeTab === 'landing' && (
                      <LandingPageTab data={startupData} />
                    )}

                    {activeTab === 'pitchdeck' && (
                      <PitchDeckTab data={startupData} />
                    )}

                    {activeTab === 'validation' && (
                      <ValidationTab data={startupData} />
                    )}

                    {activeTab === 'branding' && (
                      <BrandingTab data={startupData} />
                    )}

                    {activeTab === 'frontend' && (
                      <CodeViewTab data={startupData} />
                    )}

                    {activeTab === 'backend' && (
                      <BackendTab data={startupData} />
                    )}

                    {activeTab === 'marketing' && (
                      <MarketingTab data={startupData} />
                    )}

                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-6 text-center text-xs text-slate-500">
        <p>
          VentureForge AI — Autonomous Multi-Agent Startup Builder & Orchestrator
        </p>
      </footer>

      {/* API KEY MODAL */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(key) => setApiKey(key)}
      />

      {/* EXPORT MODAL */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        startupData={startupData}
      />

    </div>
  );
}