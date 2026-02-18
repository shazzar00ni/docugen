import React from 'react';
import { NavItem } from '../../lib/nav';

export type BreadcrumbsProps = {
  items: NavItem[];
  className?: string;
};

/**
 * Render a breadcrumb navigation trail from an array of navigation items.
 *
 * Renders nothing when `items` is an empty array.
 *
 * @param items - Ordered list of navigation items to render as breadcrumb links
 * @param className - Optional CSS class applied to the outer <nav> element
 * @returns A <nav> element containing an ordered list of links for each item, or `null` if `items` is empty
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav className={className} aria-label="Breadcrumb navigation">
      <ol className="flex items-center space-x-2 text-sm text-dark-500">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {index > 0 && <span className="mx-2 text-dark-700">/</span>}
            <a href={`#${item.id}`} className="hover:text-dark-300 transition-colors">
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}