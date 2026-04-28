import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';
import { extractHeadings, type Heading } from './markdownUtils';

export type { Heading };

export type MarkdownViewerProps = {
  content: string;
  fileName: string;
  onHeadingsExtracted?: (headings: Heading[]) => void;
};

/**
 * Render a Markdown document with GitHub Flavored Markdown support and syntax highlighting.
 *
 * Parses headings from the content and passes them via the optional `onHeadingsExtracted`
 * callback so parent components can build navigation structures. Heading elements are
 * automatically given anchor IDs via rehype-slug.
 *
 * @param content - Raw Markdown string to render
 * @param fileName - Name of the file being displayed (shown in the header)
 * @param onHeadingsExtracted - Optional callback called once with extracted headings on mount
 * @returns A React element rendering the formatted document
 */
export function MarkdownViewer({ content, fileName, onHeadingsExtracted }: MarkdownViewerProps) {
  useEffect(() => {
    if (onHeadingsExtracted) {
      onHeadingsExtracted(extractHeadings(content));
    }
  }, [content, onHeadingsExtracted]);

  return (
    <article className="max-w-none">
      <div className="mb-6 pb-4 border-b border-dark-800">
        <p className="text-dark-500 text-sm font-mono">{fileName}</p>
      </div>
      <div className="prose prose-invert prose-teal max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug, rehypeHighlight]}
          components={{
            h1: ({ children, ...props }) => (
              <h1 className="text-2xl font-bold text-dark-100 mt-8 mb-4" {...props}>
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 className="text-xl font-semibold text-dark-100 mt-6 mb-3" {...props}>
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 className="text-lg font-semibold text-dark-200 mt-5 mb-2" {...props}>
                {children}
              </h3>
            ),
            h4: ({ children, ...props }) => (
              <h4 className="text-base font-semibold text-dark-200 mt-4 mb-2" {...props}>
                {children}
              </h4>
            ),
            h5: ({ children, ...props }) => (
              <h5 className="text-sm font-semibold text-dark-300 mt-4 mb-2" {...props}>
                {children}
              </h5>
            ),
            h6: ({ children, ...props }) => (
              <h6 className="text-sm font-medium text-dark-300 mt-4 mb-2" {...props}>
                {children}
              </h6>
            ),
            p: ({ children }) => <p className="text-dark-300 leading-relaxed mb-4">{children}</p>,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
              >
                {children}
              </a>
            ),
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code
                    className="bg-dark-800 text-teal-300 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-dark-900 border border-dark-800 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-teal-500 pl-4 my-4 text-dark-400 italic">
                {children}
              </blockquote>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-dark-300 mb-4 space-y-1 pl-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-dark-300 mb-4 space-y-1 pl-4">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="text-dark-300">{children}</li>,
            table: ({ children }) => (
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-sm">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-dark-700 bg-dark-800 px-4 py-2 text-left text-dark-200 font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-dark-700 px-4 py-2 text-dark-300">{children}</td>
            ),
            hr: () => <hr className="border-dark-700 my-6" />,
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt ?? ''}
                className="max-w-full rounded-lg my-4 border border-dark-800"
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
