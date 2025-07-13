import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Trophy,
  FileText,
  Link2,
  Sun,
  Moon,
} from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="bg-white dark:bg-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.jpg"
              alt="Engineering in Kannada"
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/32?text=EK";
              }}
            />
            <span className="text-black dark:text-white font-bold text-lg hidden sm:inline">
              Engineering in Kannada
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6  ">
              <NavItem
                
                to="/"
                label="Courses"
                icon={<Home className="h-4 w-4" />}
                active={
                  location.pathname === "/" || location.pathname === "/courses"
                }
              />
              <NavItem
                to="/leaderboard"
                label="Leaderboard"
                icon={<Trophy className="h-4 w-4" />}
                active={location.pathname === "/leaderboard"}
              />
              <NavItem
                to="/blogs"
                label="Blogs"
                icon={<FileText className="h-4 w-4" />}
                active={location.pathname.includes("/blogs")}
              />
              <NavItem
                to="/links"
                label="Links"
                icon={<Link2 className="h-4 w-4" />}
                active={location.pathname === "/links"}
              />
            </nav>

            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="text-black dark:text-white hover:text-primary transition"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              className="md:hidden text-black dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mt-4 flex flex-col gap-2 md:hidden">
            <NavItem
              to="/"
              label="Courses"
              icon={<Home className="h-4 w-4" />}
              active={
                location.pathname === "/" || location.pathname === "/courses"
              }
              onClick={() => setIsMenuOpen(false)}
            />
            <NavItem
              to="/leaderboard"
              label="Leaderboard"
              icon={<Trophy className="h-4 w-4" />}
              active={location.pathname === "/leaderboard"}
              onClick={() => setIsMenuOpen(false)}
            />
            <NavItem
              to="/blogs"
              label="Blogs"
              icon={<FileText className="h-4 w-4" />}
              active={location.pathname.includes("/blogs")}
              onClick={() => setIsMenuOpen(false)}
            />
            <NavItem
              to="/links"
              label="Links"
              icon={<Link2 className="h-4 w-4" />}
              active={location.pathname === "/links"}
              onClick={() => setIsMenuOpen(false)}
            />
          </nav>
        )}
      </div>
    </header>
  );
}

function NavItem({
  to,
  label,
  icon,
  active,
  onClick = () => {},
}: {
  to: string;
  label: string;
  icon: JSX.Element;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-2 text-l transition-colors  ${
        active
          ? "text-primary"
          : "text-black dark:text-gray-300 hover:text-primary"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
