import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const solutions = [
  { name: "EmpMetria", href: "/projects/empmetria", detail: "Workforce operations" },
  { name: "Employee Monitoring", href: "/projects/monitoring", detail: "24/7 workforce operations" },
  { name: "CRM Dashboards", href: "/projects/crm", detail: "Operations and hierarchy" },
  { name: "Office Automation", href: "/projects/office-automation", detail: "Rules, routing and digests" },
  { name: "Custom Chatbots", href: "/projects/chatbots", detail: "LLM support and lead capture" },
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/features" },
  { name: "Solutions", href: "/solutions", hasDropdown: true },
  { name: "Process", href: "/how-it-works" },
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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0c1413]/95 text-white backdrop-blur-xl">
      <nav className="container-custom flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Axenora AI home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/[0.04]">
            <img src="/favicon-32x32.png" alt="" className="h-6 w-6 object-contain" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">Axenora AI</span>
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
                      isActive(item.href) ? "text-[#bdf6d2]" : "text-white/68"
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
                        className="absolute left-0 top-full mt-3 w-72 rounded-md border border-white/12 bg-[#101918] p-2 shadow-2xl"
                      >
                        {solutions.map((solution) => (
                          <Link
                            key={solution.name}
                            to={solution.href}
                            className="block rounded-md px-4 py-3 text-sm text-white/72 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <span className="block font-semibold">{solution.name}</span>
                            <span className="mt-1 block text-xs text-white/44">{solution.detail}</span>
                          </Link>
                        ))}
                        <div className="border-t border-border mt-2 pt-2">
                          <Link
                            to="/solutions"
                            className="block px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-secondary/50 transition-colors"
                          >
                            View all systems <ExternalLink className="ml-2 inline h-3.5 w-3.5" />
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
                    isActive(item.href) ? "text-[#bdf6d2]" : "text-white/68"
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
              <a href="https://empmetria.axenoraai.in" target="_blank" rel="noreferrer" className="text-sm font-medium text-white/68 hover:text-white">EmpMetria</a>
              <Link to="/contact"><Button className="rounded-md bg-[#bdf6d2] text-[#0c1413] hover:bg-[#9be7bb]">Start a project</Button></Link>
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
            className="border-t border-white/10 bg-[#0c1413] lg:hidden"
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
