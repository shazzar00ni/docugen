import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/Button';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const hasConsented = localStorage.getItem('docugen-cookie-consent');
      if (!hasConsented) {
        setShowConsent(true);
      }
    } catch {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('docugen-cookie-consent', 'accepted');
    } catch {
      // localStorage not available
    }
    setShowConsent(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('docugen-cookie-consent', 'declined');
    } catch {
      // localStorage not available
    }
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900 border-t border-slate-700"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-consent-text"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p id="cookie-consent-text" className="text-sm text-slate-200">
                  We use cookies to enhance your experience. By continuing to visit this site you
                  agree to our use of cookies.{' '}
                  <a href="/privacy" className="text-teal-400 hover:text-teal-300 underline">
                    Learn more
                  </a>
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDecline}
                  aria-label="Decline optional cookies"
                >
                  Decline
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAccept}
                  aria-label="Accept all cookies"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
