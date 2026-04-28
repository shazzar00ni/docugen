import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export type MarkdownRendererProps = {
  content: string;
  fileName?: string;
};

/**
 * Renders Markdown/MDX content with GFM support and syntax highlighting.
 *
 * @param content - Raw markdown string to render
 * @param fileName - Optional file name shown above the rendered output
 */
export function MarkdownRenderer({ content, fileName }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert max-w-none p-6 lg:p-8">
      {fileName && (
        <p className="text-xs text-dark-500 mb-4 font-mono border-b border-dark-800 pb-3">
          {fileName}
        </p>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
