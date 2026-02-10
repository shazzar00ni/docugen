import { escapeHtml } from './markdown';

export type NavItem = {
  id: string;
  title: string;
  level: number;
  children: NavItem[];
};

/** Flatten navigation hierarchy to a list representing current path to a given item */
export function getPathToItem(items: NavItem[], targetId: string): NavItem[] {
  const path: NavItem[] = [];
  function traverse(current: NavItem[]): boolean {
    for (const item of current) {
      if (item.id === targetId) {
        path.push(item);
        return true;
      }
      if (traverse(item.children)) {
        path.push(item);
        return true;
      }
      path.pop(); // not in this branch
    }
    return false;
  }
  traverse(items);
  return path;
}

/**
 * Extract heading hierarchy from parsed HTML to drive navigation and TOC
 */
export function extractNavFromHtml(html: string): NavItem[] {
  const headingRegex = /<h([1-6])[^>]*>([^<]+)<\/h\1>/g;
  const stack: NavItem[] = [];
  const result: NavItem[] = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const rawTitle = match[2];
    // Decode HTML entities back to plain text for title
    const title = rawTitle.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const item: NavItem = { id, title, level, children: [] };
    // Pop items from stack until we find parent level
    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    if (stack.length) {
      stack[stack.length - 1].children.push(item);
    } else {
      result.push(item);
    }
    stack.push(item);
  }
  return result;
}
