"use client";

import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface JsonViewerProps {
  content: string;
}

export default function JsonViewer({ content }: JsonViewerProps) {
  return (
    <div className="border rounded-md shadow-sm overflow-auto">
      <CodeMirror
        value={content}
        height="400px"
        extensions={[json()]}
        editable={false}
        className="bg-gray-50"
      />
    </div>
  );
}
