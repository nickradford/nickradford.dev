import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";

export function BackButton() {
  const backBtnClasses = classnames(
    "inline-flex items-center gap-2 text-sm font-scp font-medium text-zinc-600 hover:text-yellow transition-colors cursor-pointer",
    "dark:text-zinc-400 dark:hover:text-yellow",
    "mb-6"
  );

  return (
    <button
      type="button"
      className={backBtnClasses}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== "undefined" && window.history) {
          window.history.back();
        }
      }}
      aria-label="Go back"
    >
      <ArrowLeftIcon className="w-4 h-4" />
      Back
    </button>
  );
}
