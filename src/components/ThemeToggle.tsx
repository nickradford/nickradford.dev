import { useThemeToggle, THEME } from "../hooks/useThemeToggle";
import classNames from "classnames";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle();

  const classes = classNames(
    "text-sm font-scp font-medium text-zinc-600 hover:text-yellow transition-colors",
    "dark:text-zinc-400 dark:hover:text-yellow"
  );

  return (
    <button
      className={classes}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === THEME.light ? "Dark mode" : "Light mode"}
    >
      {theme === THEME.light ? "(dark)" : "(light)"}
    </button>
  );
}
