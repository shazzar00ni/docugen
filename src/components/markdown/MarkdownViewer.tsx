import DOMPurify from 'dompurify';

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'br',
    'strong',
    'em',
    'a',
    'ul',
    'ol',
    'li',
    'blockquote',
    'pre',
    'code',
    'img',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'align'],
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
  FORBID_ATTR: ['on*', 'style'],
};

/**
 * Sanitize an HTML string according to the component's DOMPurify configuration.
 *
 * @param html - The raw HTML to sanitize
 * @returns A sanitized HTML string suitable for insertion into `innerHTML`
 */
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
}

/**
 * Render sanitized HTML content inside a div.
 *
 * @param content - Raw HTML string to be sanitized and rendered
 * @returns A React element containing the sanitized HTML
 */
export function MarkdownViewer({ content }: { content: string }) {
  const safe = sanitizeHtml(content);
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
}
