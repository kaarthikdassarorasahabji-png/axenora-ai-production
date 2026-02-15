import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <h1 className="text-[10rem] md:text-[14rem] font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-b from-foreground/20 to-foreground/5 select-none font-['Space_Grotesk']">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-16 space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk']">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page <code className="px-1.5 py-0.5 bg-muted rounded text-sm">{location.pathname}</code> doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <Button size="lg" className="gap-2 px-8">
              <Home className="w-4 h-4" /> Go Home
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2 px-8" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>
          <Link to="/contact">
            <Button variant="ghost" size="lg" className="gap-2 px-8">
              <Search className="w-4 h-4" /> Contact Support
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
        >
          <Link to="/solutions" className="hover:text-primary transition-colors">Solutions</Link>
          <span>•</span>
          <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <span>•</span>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <span>•</span>
          <Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
