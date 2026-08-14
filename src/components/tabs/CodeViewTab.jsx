import React, { useMemo, useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  FileCode2,
  Search,
  Terminal,
  Maximize2,
  ChevronRight,
} from 'lucide-react';

export default function CodeViewTab({ data }) {
  const [activeFile, setActiveFile] = useState('App.jsx');
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  const frontend =
    data?.codeArtifacts ||
    data?.frontend ||
    data?.frontendCode ||
    data?.code ||
    {};

  const generatedFiles = useMemo(() => {
    const files = [];

    if (frontend.reactApp || frontend.app || frontend.App || frontend.appCode) {
      files.push({
        name: 'App.jsx',
        language: 'jsx',
        code: frontend.reactApp || frontend.app || frontend.App || frontend.appCode,
      });
    }

    if (frontend.tailwindConfig || frontend.tailwind) {
      files.push({
        name: 'tailwind.config.js',
        language: 'javascript',
        code: frontend.tailwindConfig || frontend.tailwind,
      });
    }

    if (frontend.index || frontend.indexCode) {
      files.push({
        name: 'index.jsx',
        language: 'jsx',
        code: frontend.index || frontend.indexCode,
      });
    }

    if (frontend.styles || frontend.css || frontend.indexCss) {
      files.push({
        name: 'index.css',
        language: 'css',
        code: frontend.styles || frontend.css || frontend.indexCss,
      });
    }

    if (Array.isArray(frontend.files)) {
      frontend.files.forEach((file) => {
        if (file?.name && file?.code) {
          files.push({
            name: file.name,
            language: file.language || getLanguage(file.name),
            code: file.code,
          });
        }
      });
    }

    return files;
  }, [frontend]);

  const files =
    generatedFiles.length > 0
      ? generatedFiles
      : [
          {
            name: 'App.jsx',
            language: 'jsx',
            code: `import React from 'react';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
      <h1 className="text-3xl font-extrabold text-white">Your startup is ready 🚀</h1>
    </main>
  );
}`,
          },
        ];

  const selectedFile =
    files.find((file) => file.name === activeFile) || files[0];

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (!data) return null;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="glass-panel overflow-hidden p-6 border border-emerald-500/30">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Frontend React Code</h2>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Production Ready
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Generated React 18 component architecture and Tailwind CSS configuration.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500"
            >
              <Download className="h-4 w-4" />
              <span>Download {selectedFile.name}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editor Main Container */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#080c16] shadow-2xl">
        {/* Editor Top Window Bar */}
        <div className="flex flex-col border-b border-slate-800 bg-slate-900/90 md:flex-row md:items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 ml-4">
              <FileCode2 className="h-4 w-4 text-indigo-400" />
              <span>{selectedFile.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span>{selectedFile.language.toUpperCase()}</span>
            <span>{selectedFile.code.split('\n').length} lines</span>
          </div>
        </div>

        <div className="flex min-h-[520px]">
          {/* File Explorer Sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-[#060913] md:block p-3">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 px-2 pt-1">
              <FileCode2 className="h-3.5 w-3.5" />
              <span>File Explorer</span>
            </div>

            <div className="space-y-1">
              {files.map((file) => {
                const isActive = file.name === selectedFile.name;
                return (
                  <button
                    key={file.name}
                    type="button"
                    onClick={() => setActiveFile(file.name)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-mono transition ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <FileCode2 className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />
                    <span className="truncate">{file.name}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Code Viewer Panel */}
          <div className="min-w-0 flex-1 p-6 bg-[#070b12] overflow-auto">
            <pre className="font-mono text-xs md:text-sm text-slate-200 leading-relaxed">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

function getLanguage(filename) {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext === 'jsx' || ext === 'tsx') return 'jsx';
  if (ext === 'js' || ext === 'ts') return 'javascript';
  if (ext === 'css') return 'css';
  if (ext === 'json') return 'json';
  return 'text';
}