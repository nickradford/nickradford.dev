import { useThemeToggle, THEME } from "../hooks/useThemeToggle";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import classNames from "classnames";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle();

  const classes = classNames(
    "text-zinc-600 hover:text-yellow transition-colors",
    "dark:text-zinc-400 dark:hover:text-yellow px-4 md:px-8 h-full",
  );

  return (
    <button
      className={classes}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === THEME.light ? "Dark mode" : "Light mode"}
    >
      {theme === THEME.light ? (
        <MoonStarsIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
}
