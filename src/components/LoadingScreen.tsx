import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from './Typewriter';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress - increased to 5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 8; // Slower progress increment
      });
    }, 250); // Slower interval

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Brand Name with Typewriter - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-['Space_Grotesk']">
              Axenora <span className="gradient-text">AI</span>
            </h1>
            <div className="text-2xl md:text-3xl text-muted-foreground min-h-[2.5rem] flex items-center justify-center">
              <Typewriter
                phrases={[
                  "Transforming Business with AI",
                  "Automating Your Success",
                  "Scaling Your Revenue",
                  "Building the Future",
                  "Empowering Innovation"
                ]}
                typingSpeed={70}
                deletingSpeed={35}
                pauseDuration={2000}
              />
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-80 max-w-[90%]"
          >
            <div className="h-1 bg-muted rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}%
            </p>
          </motion.div>

          {/* Founder Credit - Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute bottom-8 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">Founder</p>
            <p className="text-lg font-semibold gradient-text">
              Kaarthik Dass Arora
            </p>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute w-1 h-1 bg-primary rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
