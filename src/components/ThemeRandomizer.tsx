import { useEffect, useRef, useState } from "react";
import {
  buildThemeCss,
  CURRENT_STORAGE_KEY,
  DAILY_STORAGE_KEY,
  fields,
  FOUND_STORAGE_KEY,
  HISTORY_STORAGE_KEY,
  historySwatches,
  makeDailyTheme,
  makeRandomPalette,
  modePresets,
  normalizeTheme,
  originalTheme,
  serializeTheme,
  STYLE_ID,
  type Palette,
  type PaletteField,
  type ThemeMode,
  type ThemeValues,
} from "../lib/theme-lab";

type Props = {
  currentPath: string;
};

declare global {
  interface Window {
    astroThemeToggle?: {
      getTheme: () => ThemeMode;
      setTheme: (theme: ThemeMode) => void;
    };
  }
}

function ensureThemeStyle() {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  return style;
}

function getActiveMode(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function syncChromeTheme(values: ThemeValues) {
  const palette = values[getActiveMode()];
  document.documentElement.style.backgroundColor = palette.base;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  themeColor?.setAttribute("content", palette.base);
}

function applyTheme(values: ThemeValues) {
  ensureThemeStyle().textContent = buildThemeCss(values);
  syncChromeTheme(values);
}

function setFoundAttribute(found: boolean) {
  if (found) {
    document.documentElement.dataset.themeLabFound = "true";
  } else {
    delete document.documentElement.dataset.themeLabFound;
  }
}

function loadStoredTheme() {
  try {
    const stored = window.localStorage.getItem(CURRENT_STORAGE_KEY);
    return stored ? normalizeTheme(JSON.parse(stored)) : null;
  } catch {
    return null;
  }
}

function loadHistory() {
  try {
    const stored = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as unknown[]) : [];

    return parsed
      .map((item) => normalizeTheme(item))
      .filter(Boolean) as ThemeValues[];
  } catch {
    return [];
  }
}

function Swatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden="true"
      className="size-3 shrink-0 border [border-color:var(--theme-lab-border)]"
      style={{ backgroundColor: value }}
    />
  );
}

export default function ThemeRandomizer({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const [dailyEnabled, setDailyEnabled] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ThemeMode>("light");
  const [values, setValues] = useState<ThemeValues>(originalTheme);
  const [historyItems, setHistoryItems] = useState<ThemeValues[]>([]);
  const valuesRef = useRef(values);
  const labRef = useRef<HTMLDivElement | null>(null);
  const historyMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  useEffect(() => {
    const initialDailyEnabled =
      window.localStorage.getItem(DAILY_STORAGE_KEY) === "true";
    const storedTheme = loadStoredTheme();
    const initialTheme = initialDailyEnabled
      ? makeDailyTheme()
      : storedTheme ?? originalTheme;
    const initialDiscovered =
      window.localStorage.getItem(FOUND_STORAGE_KEY) === "true";

    setValues(initialTheme);
    setDailyEnabled(initialDailyEnabled);
    setSelectedMode(getActiveMode());
    setHistoryItems(loadHistory());
    setDiscovered(initialDiscovered);
    setFoundAttribute(initialDiscovered);
    applyTheme(initialTheme);

    const observer = new MutationObserver(() => {
      setSelectedMode(getActiveMode());
      syncChromeTheme(valuesRef.current);
    });

    observer.observe(document.documentElement, {
      attributeFilter: ["class", "data-theme"],
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    applyTheme(values);
    window.localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    setFoundAttribute(discovered);

    if (discovered) {
      window.localStorage.setItem(FOUND_STORAGE_KEY, "true");
    }
  }, [discovered]);

  useEffect(() => {
    const handleLabOpen = () => {
      setDiscovered(true);
      setIsOpen(true);
    };

    const handleLabReset = () => {
      setDailyEnabled(false);
      window.localStorage.removeItem(DAILY_STORAGE_KEY);
      setValues(originalTheme);
      window.localStorage.removeItem(CURRENT_STORAGE_KEY);
      applyTheme(originalTheme);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element | null;

      if (target?.closest("[data-theme-lab-open]")) {
        event.preventDefault();
        handleLabOpen();
      }

      if (target?.closest("[data-theme-lab-reset]")) {
        event.preventDefault();
        handleLabReset();
      }
    };

    window.addEventListener("theme-lab:open", handleLabOpen);
    window.addEventListener("theme-lab:reset", handleLabReset);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("theme-lab:open", handleLabOpen);
      window.removeEventListener("theme-lab:reset", handleLabReset);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (!isHistoryOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (target && historyMenuRef.current?.contains(target)) {
        return;
      }

      setIsHistoryOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isHistoryOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (target && labRef.current?.contains(target)) {
        return;
      }

      setIsHistoryOpen(false);
      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const currentPalette = values[selectedMode];
  const showDiscoveryTrigger = currentPath === "/work" && !discovered;

  function openLab() {
    setDiscovered(true);
    setIsOpen(true);
  }

  function saveHistory(next: ThemeValues) {
    setHistoryItems((current) => {
      const normalized = {
        ...next,
        id: `${next.id}-${Date.now()}`,
      };
      const updated = [
        normalized,
        ...current.filter((item) => serializeTheme(item) !== serializeTheme(next)),
      ].slice(0, 8);

      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function disableDailyTheme() {
    setDailyEnabled(false);
    window.localStorage.removeItem(DAILY_STORAGE_KEY);
  }

  function enableDailyTheme() {
    const theme = makeDailyTheme();

    setDailyEnabled(true);
    window.localStorage.setItem(DAILY_STORAGE_KEY, "true");
    setValues(theme);
    window.localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(theme));
    applyTheme(theme);
  }

  function toggleDailyTheme() {
    if (!dailyEnabled) {
      enableDailyTheme();
      return;
    }

    const previousTheme = historyItems[0] ?? originalTheme;

    disableDailyTheme();
    setValues(previousTheme);
    window.localStorage.setItem(
      CURRENT_STORAGE_KEY,
      JSON.stringify(previousTheme),
    );
    applyTheme(previousTheme);
  }

  function applyPreset(
    preset: { id: string; name: string; palette: Palette },
    mode: ThemeMode,
  ) {
    disableDailyTheme();

    const theme = {
      ...values,
      id: `${preset.id}-${mode}-${Date.now()}`,
      name: `${preset.name} ${mode}`,
      [mode]: preset.palette,
    };

    setValues(theme);
    saveHistory(theme);
  }

  function updateField(field: PaletteField, value: string) {
    disableDailyTheme();

    setValues((current) => ({
      ...current,
      id: `custom-${Date.now()}`,
      name: "Custom",
      [selectedMode]: {
        ...current[selectedMode],
        [field]: value,
      },
    }));
  }

  function selectMode(mode: ThemeMode) {
    setSelectedMode(mode);
    window.astroThemeToggle?.setTheme(mode);
    window.requestAnimationFrame(() => syncChromeTheme(valuesRef.current));
  }

  function randomizeMode() {
    disableDailyTheme();

    const next = {
      ...values,
      id: `random-${selectedMode}-${Date.now()}`,
      name: `Random ${selectedMode}`,
      [selectedMode]: makeRandomPalette(selectedMode),
    };

    setValues(next);
    saveHistory(next);
  }

  function reset() {
    disableDailyTheme();
    setValues(originalTheme);
    window.localStorage.removeItem(CURRENT_STORAGE_KEY);
    applyTheme(originalTheme);
  }

  function applyHistoryItem(item: ThemeValues) {
    disableDailyTheme();
    setValues(item);
    window.localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(item));
    applyTheme(item);
    setIsHistoryOpen(false);
  }

  return (
    <>
      {!isOpen && showDiscoveryTrigger && (
        <button
          type="button"
          className="theme-lab-discovery-trigger fixed right-3 top-1/2 z-[60] hidden -translate-y-1/2 items-center gap-2 border px-2 py-3 font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-35 shadow-lg backdrop-blur transition [background:color-mix(in_srgb,var(--theme-lab-bg)_72%,transparent)] [border-color:var(--theme-lab-border)] [box-shadow:0_18px_42px_var(--theme-lab-shadow)] [color:var(--theme-lab-muted)] hover:border-orange hover:text-orange hover:opacity-100 focus-visible:opacity-100 xl:flex"
          onClick={openLab}
          title="Open Theme Lab"
        >
          <i className="ph ph-palette" aria-hidden="true" />
          <span className="[writing-mode:vertical-rl]">Theme</span>
        </button>
      )}

      {isOpen && (
        <div
          ref={labRef}
          className="fixed bottom-4 right-4 z-[100] font-geist text-sm [color:var(--theme-lab-ink)]"
        >
          <section
            aria-label="Theme Lab"
            className="w-[min(25rem,calc(100vw-2rem))] border backdrop-blur [background:var(--theme-lab-bg)] [border-color:var(--theme-lab-border)] [box-shadow:0_24px_80px_var(--theme-lab-shadow)]"
          >
            <header className="flex items-center justify-between border-b px-3 py-2 [border-color:var(--theme-lab-border)]">
              <div className="flex items-center gap-2 font-geist-mono text-xs font-bold">
                <i className="ph ph-palette" aria-hidden="true" />
                Theme Lab
              </div>
              <button
                type="button"
                className="inline-flex size-7 items-center justify-center transition-colors [color:var(--theme-lab-muted)] hover:text-orange"
                onClick={() => {
                  setIsHistoryOpen(false);
                  setIsOpen(false);
                }}
                title="Collapse"
              >
                <i className="ph ph-x" aria-hidden="true" />
                <span className="sr-only">Collapse</span>
              </button>
            </header>

            <div className="relative p-3">
              <div className="grid grid-cols-2 gap-1 border p-1 [border-color:var(--theme-lab-border)]">
                {(["light", "dark"] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={[
                      "px-3 py-2 font-geist-mono text-xs capitalize transition-colors",
                      selectedMode === mode
                        ? "bg-orange [color:var(--theme-accent-foreground)]"
                        : "[color:var(--theme-lab-muted)] hover:text-orange",
                    ].join(" ")}
                    onClick={() => selectMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 border px-3 py-2 font-geist-mono text-xs transition-colors [border-color:var(--theme-lab-border)] hover:border-orange hover:text-orange"
                  onClick={randomizeMode}
                >
                  <i className="ph ph-shuffle" aria-hidden="true" />
                  Random
                </button>
                <button
                  type="button"
                  className={[
                    "inline-flex items-center gap-2 border px-3 py-2 font-geist-mono text-xs transition-colors",
                    dailyEnabled
                      ? "border-orange bg-orange [color:var(--theme-accent-foreground)] hover:bg-orange hover:[color:var(--theme-accent-foreground)]"
                      : "[border-color:var(--theme-lab-border)] hover:border-orange hover:text-orange",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={toggleDailyTheme}
                  aria-pressed={dailyEnabled}
                >
                  <i className="ph ph-dice-five" aria-hidden="true" />
                  Daily
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 border px-3 py-2 font-geist-mono text-xs transition-colors [border-color:var(--theme-lab-border)] hover:border-orange hover:text-orange"
                  onClick={reset}
                >
                  <i className="ph ph-arrow-counter-clockwise" aria-hidden="true" />
                  Reset
                </button>
                <div ref={historyMenuRef} className="relative ml-auto">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 border px-3 py-2 font-geist-mono text-xs transition-colors [border-color:var(--theme-lab-border)] hover:border-orange hover:text-orange"
                    onClick={() => setIsHistoryOpen((current) => !current)}
                    aria-expanded={isHistoryOpen}
                  >
                    <i className="ph ph-clock-counter-clockwise" aria-hidden="true" />
                    History
                  </button>

                  {isHistoryOpen && (
                    <div className="absolute right-0 top-[calc(100%+0.5rem)] z-10 w-[min(21rem,calc(100vw-2rem))] border p-2 [background:var(--theme-lab-solid-bg)] [border-color:var(--theme-lab-border)] [box-shadow:0_18px_48px_var(--theme-lab-shadow)]">
                      <div className="mb-2 flex items-center justify-between font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]">
                        <span>Recent</span>
                        <span>{historyItems.length}/8</span>
                      </div>
                      {historyItems.length === 0 ? (
                        <p className="m-0 p-2 text-xs [color:var(--theme-lab-muted)]">
                          Randomize or pick presets to build history.
                        </p>
                      ) : (
                        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                          {historyItems.map((item) => {
                            const palette = item[selectedMode];

                            return (
                              <button
                                key={item.id}
                                type="button"
                                className="group w-full border px-2 py-2 text-left transition-colors [border-color:var(--theme-lab-border)] hover:border-orange focus-visible:border-orange"
                                onClick={() => applyHistoryItem(item)}
                              >
                                <span className="min-w-0 truncate font-geist-mono text-[0.6875rem]">
                                  {item.name}
                                </span>
                                <span className="mt-2 grid grid-cols-4 gap-1.5">
                                  {historySwatches.map((swatch) => (
                                    <span
                                      key={swatch.key}
                                      className="min-w-0 font-geist-mono text-[0.5625rem] uppercase tracking-[0.08em] [color:var(--theme-lab-muted)]"
                                      title={`${swatch.label}: ${palette[swatch.key]}`}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="mb-1 block h-3 border [border-color:var(--theme-lab-border)]"
                                        style={{
                                          backgroundColor: palette[swatch.key],
                                        }}
                                      />
                                      <span>{swatch.label}</span>
                                    </span>
                                  ))}
                                </span>
                                <span className="mt-2 block font-geist-mono text-[0.5625rem] uppercase tracking-[0.16em] [color:var(--theme-lab-muted)] group-hover:text-orange">
                                  {selectedMode}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <div className="mb-2 font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]">
                  {selectedMode} presets
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {modePresets[selectedMode].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className="flex min-h-12 items-center gap-2 border px-2 py-2 text-left transition-colors [border-color:var(--theme-lab-border)] hover:border-orange"
                      onClick={() => applyPreset(preset, selectedMode)}
                    >
                      <span className="flex gap-1">
                        <Swatch value={preset.palette.base} />
                        <Swatch value={preset.palette.accent} />
                        <Swatch value={preset.palette.line} />
                      </span>
                      <span className="font-geist-mono text-[0.6875rem] leading-tight">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <div className="mb-2 font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]">
                  {selectedMode} values
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {fields.map((field) => (
                    <label
                      key={field.key}
                      className="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 border p-2 [border-color:var(--theme-lab-border)]"
                    >
                      <input
                        type="color"
                        className="size-8 cursor-pointer border-0 bg-transparent p-0"
                        value={currentPalette[field.key]}
                        onChange={(event) =>
                          updateField(field.key, event.currentTarget.value)
                        }
                      />
                      <span className="font-geist-mono text-[0.6875rem] [color:var(--theme-lab-muted)]">
                        {field.label}
                      </span>
                      <span className="col-start-2 font-geist-mono text-[0.6875rem]">
                        {currentPalette[field.key]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </div>
      )}
    </>
  );
}
