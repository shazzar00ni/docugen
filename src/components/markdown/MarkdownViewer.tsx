import React from 'react';
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
 * Sanitizes an HTML string to remove disallowed tags and attributes.
 *
 * @param html - The input HTML to sanitize
 * @returns The sanitized HTML string with disallowed tags and attributes removed
 */
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
}

/**
 * Render sanitized HTML content inside a div.
 *
 * The provided HTML is sanitized before insertion to prevent unsafe markup (e.g., scripts or event handlers).
 *
 * @param content - HTML string to render; it will be sanitized before being inserted into the DOM
 * @returns A JSX element containing the sanitized content
 */
export function MarkdownViewer({ content }: { content: string }) {
  const safe = sanitizeHtml(content);
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
}