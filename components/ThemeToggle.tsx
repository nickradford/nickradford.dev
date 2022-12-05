import { useThemeToggle, THEME } from "@/hooks/useThemeToggle";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle();

  const classes = classNames(
    "z-10 rounded-full  border h-9 w-9 overflow-hidden bg-zinc-50/80 border-zinc-200 backdrop-blur backdrop-saturate-150",
    "left-full ml-4",
    "dark:text-zinc-400 dark:bg-zinc-800/70 dark:border-zinc-600/75"
  );

  const iconStyles =
    "absolute top-0 p-2 opacity-0 transition-opacity duration-300";
  const moonStyles = classNames(iconStyles, {
    "!opacity-100": theme === THEME.light,
  });
  const sunStyles = classNames(iconStyles, {
    "!opacity-100": theme === THEME.dark,
  });

  return (
    <button className={classes} onClick={toggleTheme}>
      <div className="relative w-full h-full">
        <MoonIcon className={moonStyles} />
        <SunIcon className={sunStyles} />
      </div>
    </button>
  );
}
