/**
 * Utilities for parsing and processing Markdown content.
 */

export type Heading = {
  id: string;
  text: string;
  level: number;
};

/**
 * Slugify a heading text into an anchor-safe id.
 * Must match the algorithm used by rehype-slug (github-slugger).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s]+/g, '-');
}

/**
 * Extract headings from raw Markdown content for navigation.
 *
 * @param markdown - Raw markdown string to parse
 * @returns Array of heading objects with id, text, and level
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const base = slugify(text);
      const count = seen.get(base) ?? 0;
      const id = count === 0 ? base : `${base}-${count}`;
      seen.set(base, count + 1);
      headings.push({ id, text, level });
    }
  }

  return headings;
}
