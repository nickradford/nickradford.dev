import { useEffect, useRef } from "react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkMode ? "dark" : "light";
}

function updateThemeUI(theme: Theme, moonIcon: HTMLElement | null, sunIcon: HTMLElement | null, button: HTMLElement | null) {
  if (theme === "light") {
    moonIcon?.classList.remove("hidden");
    sunIcon?.classList.add("hidden");
    button?.setAttribute("title", "Dark mode");
  } else {
    moonIcon?.classList.add("hidden");
    sunIcon?.classList.remove("hidden");
    button?.setAttribute("title", "Light mode");
  }
}

export default function ThemeToggle() {
  const moonIconRef = useRef<HTMLDivElement>(null);
  const sunIconRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const initialTheme = getTheme();
    updateThemeUI(initialTheme, moonIconRef.current, sunIconRef.current, buttonRef.current);
  }, []);

  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);

    updateThemeUI(newTheme, moonIconRef.current, sunIconRef.current, buttonRef.current);
  };

  return (
    <button
      ref={buttonRef}
      id="theme-toggle"
      className="text-zinc-600 hover:text-orange transition-colors dark:text-zinc-400 dark:hover:text-orange px-4 md:px-8 h-full"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <div ref={moonIconRef} className="ph ph-moon-stars text-xl hidden"></div>
      <div ref={sunIconRef} className="ph ph-sun text-xl"></div>
    </button>
  );
}
