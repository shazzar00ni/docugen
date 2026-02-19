import { escapeHtml } from './markdown';

export type NavItem = {
  id: string;
  title: string;
  level: number;
  children: NavItem[];
};

/**
 * Build the sequence of navigation items from the target item up through its ancestors.
 *
 * @param items - Top-level navigation items to search
 * @param targetId - Identifier of the target navigation item
 * @returns An array of `NavItem` objects beginning with the target item and followed by its ancestors up to the highest matched ancestor; an empty array if `targetId` is not found
 */
export function getPathToItem(items: NavItem[], targetId: string): NavItem[] {
  const path: NavItem[] = [];
  /**
   * Recursively searches the provided list of navigation items for `targetId` and updates the surrounding `path` with the discovered branch.
   *
   * When a match is found, the target and its ancestor items are pushed onto the outer `path`; entries from branches that do not contain the target are removed during backtracking.
   *
   * @param current - The list of navigation items to traverse
   * @returns `true` if an item with `targetId` was found in `current` or any of its descendants, `false` otherwise.
   */
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
 * Build a hierarchical navigation tree from HTML heading elements.
 *
 * @param html - HTML string containing <h1>–<h6> heading elements
 * @returns An array of top-level `NavItem` objects representing the heading hierarchy; each item includes `id`, `title`, `level`, and nested `children`
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