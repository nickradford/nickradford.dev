import { useState, useEffect } from "react";

const STORAGE_KEY = "astro-show-drafts";

export function DraftToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem(STORAGE_KEY) === "true";
    setEnabled(stored);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setEnabled(newValue);
    localStorage.setItem(STORAGE_KEY, newValue ? "true" : "false");

    // Dispatch custom event for HomepageBlog to listen to
    window.dispatchEvent(
      new CustomEvent("draft-toggle-changed", { detail: { enabled: newValue } })
    );
  };

  // Only render in development
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={enabled}
        onChange={handleChange}
        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 cursor-pointer"
        title="Show draft posts"
      />
      <span className="text-sm font-scp font-medium text-zinc-600 dark:text-zinc-400">
        Show drafts
      </span>
    </label>
  );
}
