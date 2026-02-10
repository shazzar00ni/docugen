import React from 'react';
import { NavItem } from '../../lib/nav';

export type BreadcrumbsProps = {
  items: NavItem[];
  className?: string;
};

/** Breadcrumb trail showing navigation path */
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
