import DOMPurify from 'dompurify';

export function MarkdownViewer({ content }: { content: string }) {
  const sanitized = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
