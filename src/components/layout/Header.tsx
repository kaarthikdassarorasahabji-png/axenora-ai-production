import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/lib/catalog";

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const header = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    }
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenu(false);
    }
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [open]);
  const links = [
    { name: "Studio", path: "/about" },
    { name: "Our process", path: "/how-it-works" },
    { name: "Pricing", path: "/pricing" },
  ];
  return (
    <header className="site-header" ref={header}>
      <nav className="studio-wrap header-inner" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Axenora AI home">
          <img src="/favicon-32x32.png" alt="" />
          <span>Axenora AI</span>
        </Link>
        <div className="desktop-nav">
          <div className="nav-dropdown">
            <button
              className={
                pathname.startsWith("/projects") || pathname === "/solutions"
                  ? "nav-active"
                  : ""
              }
              aria-expanded={menu}
              aria-controls="solutions-menu"
              onClick={() => setMenu(!menu)}
            >
              Our solutions
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  id="solutions-menu"
                  className="solutions-menu"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  <div className="solutions-menu-heading">
                    <span>Explore the ecosystem</span>
                    <Link to="/solutions">
                      View all
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                  <div className="solutions-menu-grid">
                    {products.map((p) => (
                      <Link to={`/projects/${p.slug}`} key={p.slug}>
                        <span>{p.name}</span>
                        <small>{p.category}</small>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={pathname === l.path ? "nav-active" : ""}
            >
              {l.name}
            </Link>
          ))}
        </div>
        <div className="header-actions">
          {user ? (
            <>
              <Link className="header-workspace" to="/dashboard">
                Workspace
              </Link>
              <button
                className="header-workspace"
                onClick={async () => {
                  await signOut();
                  navigate("/");
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <a
              className="header-workspace"
              href="https://elovri.axenoraai.in"
              target="_blank"
              rel="noreferrer"
            >
              Client workspace
              <ArrowUpRight size={13} />
            </a>
          )}
          <Link to="/contact" className="header-cta">
            Let's talk
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <button
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <Link to="/solutions" className="mobile-nav-title">
              Our solutions
              <ArrowUpRight size={20} />
            </Link>
            <div className="mobile-solutions">
              {products.map((p) => (
                <Link to={`/projects/${p.slug}`} key={p.slug}>
                  {p.slug === "calling" ? "AI Calling Agents" : p.name}
                </Link>
              ))}
            </div>
            {links.map((l) => (
              <Link className="mobile-nav-title" to={l.path} key={l.path}>
                {l.name}
                <ArrowUpRight size={17} />
              </Link>
            ))}
            <Link to="/contact" className="studio-action">
              Start a conversation
              <ArrowUpRight size={17} />
            </Link>
            {user && (
              <Link className="mobile-nav-title" to="/dashboard">
                Workspace
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
