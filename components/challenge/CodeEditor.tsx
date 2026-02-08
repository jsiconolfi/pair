'use client';

import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { Code2, Check } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onChange: (code: string) => void;
}

export default function CodeEditor({ 
  initialCode, 
  language, 
  onChange 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onChange(newCode);
    setIsSaved(false);
    
    // Auto-save indicator
    setTimeout(() => setIsSaved(true), 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-claude">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-claude bg-surface">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-claude-text-secondary" />
          <span className="text-sm font-medium text-claude-text">Your Code</span>
        </div>
        
        <div className="flex items-center gap-3">
          {isSaved && code !== initialCode && (
            <div className="flex items-center gap-1.5 text-xs text-success">
              <Check className="w-3.5 h-3.5" />
              <span>Saved</span>
            </div>
          )}
          <select 
            className="text-xs border border-claude rounded-md px-2 py-1 bg-white text-claude-text-secondary focus:outline-none focus:border-claude-orange"
            value={language}
            disabled
          >
            <option value="typescript">TypeScript</option>
          </select>
        </div>
      </div>
      
      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleChange}
          theme="light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
            lineHeight: 1.6,
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
}