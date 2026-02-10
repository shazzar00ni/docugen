import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/content';
import { Button } from './ui/Button';

/**
 * Mobile navigation menu component.
 * Provides hamburger menu functionality for mobile devices.
 *
 * @returns Mobile navigation component with slide-in animation
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Manages body scroll overflow when menu is open.
   * Prevents background scrolling when mobile menu is active.
   *
   * @returns Cleanup function to restore body overflow
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /**
   * Closes the mobile menu.
   *
   * @returns Function to close menu
   */
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-slate-300 hover:text-slate-100 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-slate-950 border-l border-slate-800 z-50 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-6">
                <nav className="flex-1 space-y-2">
                  {NAV_LINKS.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={closeMenu}
                      className="block px-4 py-3 text-slate-300 hover:text-teal-400 hover:bg-slate-900/50 rounded-lg transition-colors text-base font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <Button variant="ghost" className="w-full justify-center">
                    Sign In
                  </Button>
                  <Button variant="primary" className="w-full justify-center">
                    Get Early Access
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
