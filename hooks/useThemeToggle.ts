import { useEffect, useState } from "react";

export enum THEME {
  light = "light",
  dark = "dark",
}

export function useThemeToggle() {
  const [theme, setTheme] = useState<THEME>(THEME.light);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme as THEME);
    }

    console.log("theme", theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === THEME.light ? THEME.dark : THEME.light;
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
