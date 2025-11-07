'use client';

import dynamic from 'next/dynamic';
import { commands, ICommand } from '@uiw/react-md-editor';

import { removeAllowTransparency } from '@/lib/utils';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const customCommands: ICommand[] = [
  { ...commands.title1, icon: <span>H1</span> },
  { ...commands.title2, icon: <span>H2</span> },
  { ...commands.title3, icon: <span>H3</span> },
  commands.divider,
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.divider,
  commands.code,
  commands.codeBlock,
  commands.link,
];

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const cleanedValue = removeAllowTransparency(value);

  return (
    <div className="md-editor-container">
      <MDEditor
        value={cleanedValue}
        onChange={onChange}
        commands={customCommands}
        extensions={[commands.codeEdit, commands.codeLive, commands.fullscreen]}
      />
    </div>
  );
};

export default MarkdownEditor;
