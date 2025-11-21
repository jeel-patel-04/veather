import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ui/theme-provider";
import { Sun, Moon } from "lucide-react";
import CitySearch from "./city-search";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">

        {/* Logo */}
        <Link to="/">
          <img
            src={isDark ? "/2.png" : "/1.png"}
            alt="veather logo"
            className="h-12 md:h-14 transition-all"
          />
        </Link>

        {/* Search + Theme Button */}
        <div className="flex items-center gap-3 md:gap-4">

          {/* Search Component */}
          <div className="hidden sm:block">
            <CitySearch />
          </div>

          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 transition-all" />
            )}
          </div>

        </div>
      </div>

      {/* Mobile Search (full width) */}
      <div className="block sm:hidden px-4 pb-2">
        <CitySearch />
      </div>

    </header>
  );
};

export default Header;
