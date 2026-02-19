import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export type MobileMenuProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Renders a mobile navigation menu with a toggle button, an overlay, and a slide-in panel.
 *
 * The trigger button toggles the panel open and closed, the overlay and a close button inside the panel close it,
 * and the Escape key will also close the menu.
 *
 * @param children - Content rendered inside the slide-in panel
 * @param className - Optional CSS class names applied to the outermost container
 * @returns A React element representing the mobile navigation menu
 */
export function MobileMenu({ children, className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={className}>
      {/* Mobile menu trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed top-16 left-0 right-0 z-50 flex max-h-0 overflow-hidden">
            <div className="relative w-full max-w-xs mx-auto bg-white dark:bg-gray-900 shadow-xl ring-1 ring-black ring-opacity-5">
              <div className="flex items-start justify-between p-4">
                <div className="flex-1">{children}</div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-3 flex-shrink-0 p-2 text-gray-400 hover:text-gray-500"
                  aria-label="Close navigation menu"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}