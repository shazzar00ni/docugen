import React, { useEffect, useRef } from 'react';
import { NavItem } from '../../lib/nav';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export type NavigationProps = {
  items: NavItem[];
  activeId?: string;
  className?: string;
};

/** Recursive NavItem rendering with expand/collapse */
function NavNode({ item, activeId }: { item: NavItem; activeId?: string }) {
  const hasChildren = item.children.length > 0;
  const isActive = item.id === activeId;
  const isDescendant = activeId?.startsWith(item.id + '-');

  return (
    <li>
      <div>
        <a
          href={`#${item.id}`}
          className={`block text-sm transition-colors ${
            isActive
              ? 'text-teal-400 font-medium'
              : isDescendant
                ? 'text-dark-300'
                : 'text-dark-500 hover:text-dark-300'
          }`}
        >
          <ChevronRightIcon
            className={`w-3 h-3 inline transition-transform mr-1 ${
              hasChildren ? (isActive || isDescendant ? 'rotate-90' : 'rotate-0') : 'opacity-0'
            }`}
          />
          {item.title}
        </a>
      </div>
      {hasChildren && (
        <ul className="ml-4 space-y-1 mt-1 border-l border-dark-800 pl-2">
          {item.children.map(child => (
            <NavNode key={child.id} item={child} activeId={activeId} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Navigation sidebar showing document structure */
export function Navigation({ items, activeId, className }: NavigationProps) {
  return (
    <nav className={className} aria-label="Document navigation">
      <ul className="space-y-2">
        {items.map(item => (
          <NavNode key={item.id} item={item} activeId={activeId} />
        ))}
      </ul>
    </nav>
  );
}
