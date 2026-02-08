'use client';

import { Editor } from '@monaco-editor/react';
import { useState } from 'react';

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

  const handleChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onChange(newCode);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">📝 Code Editor</span>
        </div>
        <select 
          className="text-sm border border-gray-300 rounded px-3 py-1 bg-white"
          value={language}
          disabled
        >
          <option value="typescript">TypeScript</option>
        </select>
      </div>
      
      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}