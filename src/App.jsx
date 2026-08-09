import React, { useState } from 'react';
import Header from './components/Header';
import IdeaInput from './components/IdeaInput';
import AgentStatusRadar from './components/AgentStatusRadar';
import TabsHeader from './components/TabsHeader';
import ValidationTab from './components/tabs/ValidationTab';
import BrandingTab from './components/tabs/BrandingTab';
import LandingPageTab from './components/tabs/LandingPageTab';
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
  const [activeTab, setActiveTab] = useState('validation');

  const [apiKey, setApiKey] = useState('');
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleStartPipeline = async (userPrompt) => {
    setPrompt(userPrompt);
    setIsGenerating(true);
    setIsCompleted(false);
    setLogs([]);
    setActiveStepIndex(0);
    setStartupData(null);

    try {
      const packageData = await runAgentPipeline(userPrompt, apiKey, (progress) => {
        setActiveStepIndex(progress.activeStepIndex);
        setActiveAgent(progress.activeAgent);
        if (progress.log) {
          setLogs(prev => [...prev, progress.log]);
        }
      });

      setStartupData(packageData);
      setIsCompleted(true);
      setActiveTab('landing'); // Default to Live Landing Page preview when complete!
    } catch (err) {
      console.error('Agent pipeline error:', err);
      setLogs(prev => [...prev, '❌ Pipeline failed. Please try again.']);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPrompt('');
    setStartupData(null);
    setIsGenerating(false);
    setIsCompleted(false);
    setLogs([]);
    setActiveStepIndex(0);
    setActiveAgent(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isGenerating={isGenerating}
        prompt={prompt}
        onReset={handleReset}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {!prompt ? (
          /* Step 1: Idea Input Screen */
          <IdeaInput
            onSubmitIdea={handleStartPipeline}
            isGenerating={isGenerating}
          />
        ) : (
          /* Step 2: Agent Monitor & Output View */
          <div>
            {/* Agent Radar & Real-time Logs */}
            <AgentStatusRadar
              activeAgent={activeAgent}
              activeStepIndex={activeStepIndex}
              logs={logs}
              isGenerating={isGenerating}
              isCompleted={isCompleted}
            />

            {/* Generated Tabs Content */}
            {startupData && (
              <div className="animate-fadeIn">
                <TabsHeader
                  activeTab={activeTab}
                  onSelectTab={(tabId) => setActiveTab(tabId)}
                />

                <div className="mt-6">
                  {activeTab === 'validation' && <ValidationTab data={startupData} />}
                  {activeTab === 'branding' && <BrandingTab data={startupData} />}
                  {activeTab === 'landing' && <LandingPageTab data={startupData} />}
                  {activeTab === 'frontend' && <CodeViewTab data={startupData} />}
                  {activeTab === 'backend' && <BackendTab data={startupData} />}
                  {activeTab === 'marketing' && <MarketingTab data={startupData} />}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-6 text-center text-xs text-slate-500">
        <p>VentureForge AI — Autonomous Multi-Agent Startup Builder & Orchestrator</p>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(key) => setApiKey(key)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        startupData={startupData}
      />
    </div>
  );
}
