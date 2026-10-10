import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      // Show banner after 1 second
      const timeout = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setShowBanner(false);
  };

  const declineCookies = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 });
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 left-4 z-40 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="container-custom">
            <div className="relative rounded-md bg-[#192725] text-white p-5 border border-white/15 shadow-lg max-w-2xl mx-auto">
              <button
                onClick={declineCookies}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-base font-semibold mb-2">Privacy preferences</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sign-in uses essential storage. Chat history stays on this device until you clear it. Read how we handle your information.
                    {' '}
                    <a href="/privacy" className="text-[#c5f5df] hover:underline">
                      Privacy policy
                    </a>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={declineCookies}
                    className="whitespace-nowrap"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={acceptCookies}
                    className="bg-[#c5f5df] text-[#192725] hover:bg-[#a8e9cb] whitespace-nowrap"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
