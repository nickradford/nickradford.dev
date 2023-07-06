import classNames from "classnames";

import { Footer } from "./Footer";

export function Page({ children }) {
  const classes = classNames(
    "flex flex-col w-full min-h-screen px-8 pt-20 max-w-7xl bg-zinc-100 border-x border-zinc-300/75 transition-colors",
    "md:px-16",
    "dark:bg-zinc-900 dark:border-zinc-800/75"
  );
  return (
    <div className={classes}>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
