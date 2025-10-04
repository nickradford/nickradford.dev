import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";

export function BackButton() {
  const containerClasses = classnames("sticky top-[22px] z-50");

  const backBtnClasses = classnames(
    "fixed bottom-8 right-0 mr-8 z-50 no-underline p-2 rounded-full border cursor-pointer transition-colors",
    "bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200 hover:border-zinc-400",
    "dark:bg-black dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700",
    "md:absolute md:top-0 md:left-0 md:bottom-auto md:right-auto md:-translate-x-[calc(100%+2rem)]",
    "md:bg-zinc-50 md:shadow-lg",
    "md:dark:bg-zinc-800/80 "
  );
  return (
    <div className={containerClasses}>
      <a
        className={backBtnClasses}
        onClick={() =>
          typeof window !== "undefined" ? window.history.back() : null
        }
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </a>
    </div>
  );
}
