import React from 'react';

function sanitizeHtml(html: string): string {
  // Basic sanitization: remove script tags and event handlers
  const withoutScripts = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  const withoutEvents = withoutScripts.replace(/\son\w+\s*=\s*(['\"]).*?\1/gi, '');
  // Remove javascript: in href/src attributes
  const sanitized = withoutEvents.replace(
    /\s(href|src)\s*=\s*(['"])javascript:[^'" >]+(['"])?/gi,
    ' '
  );
  return sanitized;
}

export function MarkdownViewer({ content }: { content: string }) {
  const safe = typeof window !== 'undefined' ? sanitizeHtml(content) : content;
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
}
