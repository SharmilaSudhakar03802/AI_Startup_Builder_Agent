import React, { useState } from 'react';
import { Code2, Copy, Check, Download, Terminal } from 'lucide-react';

export default function CodeViewTab({ data }) {
  if (!data) return null;
  const { codeArtifacts, branding } = data;
  const [activeFile, setActiveFile] = useState('App.jsx');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    if (activeFile === 'App.jsx') return codeArtifacts.reactApp;
    if (activeFile === 'tailwind.config.js') return codeArtifacts.tailwindConfig;
    return '';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([getCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="glass-panel p-6 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg text-white">Generated React 18 & Tailwind Frontend Code</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Production-ready React component code created by CodeForge Frontend Agent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download {activeFile}</span>
          </button>
        </div>
      </div>

      {/* File Tabs & Editor Box */}
      <div className="glass-panel border border-slate-800 rounded-2xl overflow-hidden">
        {/* Editor Top Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-500" />
            <button
              onClick={() => setActiveFile('App.jsx')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                activeFile === 'App.jsx'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              App.jsx
            </button>
            <button
              onClick={() => setActiveFile('tailwind.config.js')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                activeFile === 'tailwind.config.js'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              tailwind.config.js
            </button>
          </div>

          <span className="text-[10px] font-mono text-slate-500">React 18 + Tailwind CSS</span>
        </div>

        {/* Code Content */}
        <div className="p-6 bg-[#070b12] overflow-x-auto max-h-[550px]">
          <pre className="font-mono text-xs text-slate-300 leading-relaxed">
            <code>{getCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
