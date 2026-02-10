import React, { useEffect, useState, useRef } from 'react';
import { NavItem } from '../../lib/nav';

export type TableOfContentsProps = {
  items: NavItem[];
  className?: string;
};

/** Recursive TOC item rendering */
function TocNode({ item, activeId }: { item: NavItem; activeId?: string }) {
  const hasChildren = item.children.length > 0;
  const isActive = item.id === activeId;
  return (
    <li>
      <a
        href={`#${item.id}`}
        className={`block text-xs py-1 transition-colors rounded px-2 ${
          isActive
            ? 'text-teal-400 bg-dark-800 font-medium'
            : 'text-dark-500 hover:text-dark-300 hover:bg-dark-800'
        }`}
      >
        {item.title}
      </a>
      {hasChildren && (
        <ul className="ml-3 mt-1 space-y-1 border-l border-dark-800 pl-2">
          {item.children.map(child => (
            <TocNode key={child.id} item={child} activeId={activeId} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Table of Contents with active-section scroll spy */
export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>();
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    // Set up IntersectionObserver to spy on headings
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 1] }
    );

    // Observe all heading elements
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <aside className={className} aria-label="Table of contents">
      <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wide mb-3">
        On this page
      </h3>
      <ul className="space-y-1">
        {items.map(item => (
          <TocNode key={item.id} item={item} activeId={activeId} />
        ))}
      </ul>
    </aside>
  );
}
