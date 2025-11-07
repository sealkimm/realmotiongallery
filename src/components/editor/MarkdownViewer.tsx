'use client';

import dynamic from 'next/dynamic';

import '@uiw/react-markdown-preview/markdown.css';

import { removeAllowTransparency } from '@/lib/utils';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  const cleanedContent = removeAllowTransparency(content);

  return (
    <div className="md-viewer-container">
      <MarkdownPreview source={cleanedContent} />
    </div>
  );
};

export default MarkdownViewer;
