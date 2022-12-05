import { useEffect, useState } from "react";

export enum THEME {
  light = "light",
  dark = "dark",
}

export function useThemeToggle() {
  const [theme, setTheme] = useState<THEME>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme as THEME);
    } else {
      // infer the theme from the media query
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = prefersDarkMode ? THEME.dark : THEME.light;
      setTheme(theme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === THEME.dark ? THEME.light : THEME.dark;
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
