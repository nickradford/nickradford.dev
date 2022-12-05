import { useThemeToggle, THEME } from "@/hooks/useThemeToggle";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle();

  const classes = classNames(
    "z-10 rounded-full border h-9 w-9 overflow-hidden bg-zinc-50/80 border-zinc-200 backdrop-blur backdrop-saturate-150",
    "left-full ml-4",
    "dark:text-zinc-400 dark:bg-zinc-800/70 dark:border-zinc-600/75"
  );

  const wrapperClasses = classNames("relative transition-transform", {
    "-translate-y-[34px]": theme === THEME.light,
  });
  return (
    <button className={classes} onClick={toggleTheme}>
      <div className={wrapperClasses}>
        <MoonIcon className="p-2" /> <SunIcon className="p-2" />
      </div>
    </button>
  );
}
