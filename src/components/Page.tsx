import classNames from "classnames";

import { Footer } from "./Footer";

export function Page({ children }) {
  const classes = classNames(
    "flex flex-col w-full bg-ivory transition-colors",
    "dark:bg-zinc-950",
  );
  return (
    <div className={classes}>
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
