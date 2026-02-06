import { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import DOMPurify from 'dompurify';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  const [html, setHtml] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processMarkdown = async () => {
      setIsProcessing(true);
      setError(null);

      try {
        const file = await unified()
          .use(remarkParse) // Parse markdown
          .use(remarkGfm) // Support GitHub Flavored Markdown
          .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML
          .use(rehypeRaw) // Parse raw HTML in markdown
          .use(rehypeSlug) // Add IDs to headings
          .use(rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: {
              className: ['anchor-link'],
            },
          }) // Add anchor links to headings
          .use(rehypeHighlight, { detect: true }) // Syntax highlighting
          .use(rehypeStringify) // Convert to HTML string
          .process(content);

        // Sanitize HTML to prevent XSS attacks
        const sanitizedHtml = DOMPurify.sanitize(String(file), {
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
        });

        setHtml(sanitizedHtml);
      } catch (err) {
        console.error('Error processing markdown:', err);
        setError(err instanceof Error ? err.message : 'Failed to process markdown');
      } finally {
        setIsProcessing(false);
      }
    };

    if (content) {
      processMarkdown();
    }
  }, [content]);

  if (error) {
    return (
      <div className={`markdown-viewer-error ${className}`}>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold mb-2">Error Processing Markdown</h3>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className={`markdown-viewer-loading ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`markdown-viewer prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
