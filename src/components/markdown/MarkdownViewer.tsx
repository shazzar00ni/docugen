import React from 'react';
export function MarkdownViewer({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
