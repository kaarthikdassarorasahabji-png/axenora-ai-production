import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const solutions = [
  { name: "AI Website Development", href: "/solutions/website" },
  { name: "AI Ads & Marketing", href: "/solutions/ads" },
  { name: "WhatsApp Automation", href: "/solutions/whatsapp" },
  { name: "AI Chatbots", href: "/solutions/chatbots" },
  { name: "AI Calling Agents", href: "/solutions/calling" },
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Solutions", href: "/solutions", hasDropdown: true },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/Logo.png" alt="Axenora AI" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.hasDropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {solutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 rounded-xl glass p-2"
                      >
                        {solutions.map((solution) => (
                          <Link
                            key={solution.name}
                            to={solution.href}
                            className="block px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                          >
                            {solution.name}
                          </Link>
                        ))}
                        <div className="border-t border-border mt-2 pt-2">
                          <Link
                            to="/solutions"
                            className="block px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-secondary/50 transition-colors"
                          >
                            View All Solutions →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            // Logged in: Show Dashboard link and user menu
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile?.name || 'User'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* User Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl glass p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary/50 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm text-destructive hover:bg-secondary/50 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Logged out: Show Login and Register buttons
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="btn-primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border"
          >
            <div className="container-custom py-4 space-y-2 max-h-[70vh] overflow-y-auto">
               {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-3 text-lg font-medium"
                      >
                        {item.name}
                      </Link>
                      <div className="pl-4 space-y-1">
                        {solutions.map((solution) => (
                          <Link
                            key={solution.name}
                            to={solution.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {solution.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="mt-4 space-y-2">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button className="w-full" variant="outline">Dashboard</Button>
                    </Link>
                    <Button
                      onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                      className="w-full"
                      variant="destructive"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button className="w-full" variant="outline">Login</Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button className="btn-primary w-full">Get Started</Button>
                    </Link>
                  </>
                )}
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
