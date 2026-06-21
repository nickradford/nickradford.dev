import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  buildThemeCss,
  CURRENT_STORAGE_KEY,
  CUSTOM_THEME_LIMIT_PER_MODE,
  CUSTOM_STORAGE_KEY,
  DAILY_STORAGE_KEY,
  fields,
  FOUND_STORAGE_KEY,
  getConceptHarmonyPoints,
  HISTORY_STORAGE_KEY,
  historySwatches,
  makeConceptPalette,
  makeDailyTheme,
  makeRandomConceptPoint,
  modePresets,
  normalizeTheme,
  originalTheme,
  serializeTheme,
  STYLE_ID,
  type ConceptPoint,
  type CustomTheme,
  type Palette,
  type PaletteField,
  type PalettePreset,
  type ThemeMode,
  type ThemeValues,
} from "../lib/theme-lab";

type Props = {
  currentPath: string;
};

type ConceptMotion = "spring" | "direct";

const fallbackConceptPoint: ConceptPoint = {
  voltage: 0.58,
  entropy: 0.24,
  glow: 0.18,
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

function isPalette(value: unknown): value is Palette {
  if (!value || typeof value !== "object") {
    return false;
  }

  const palette = value as Partial<Palette>;

  return fields.every(({ key }) => typeof palette[key] === "string");
}

function normalizeCustomTheme(value: unknown): CustomTheme | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Partial<CustomTheme>;

  if (
    raw.id &&
    raw.name &&
    (raw.mode === "light" || raw.mode === "dark") &&
    isPalette(raw.palette)
  ) {
    return {
      id: raw.id,
      name: raw.name,
      mode: raw.mode,
      palette: raw.palette,
    };
  }

  return null;
}

function loadCustomThemes() {
  try {
    const stored = window.localStorage.getItem(CUSTOM_STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as unknown[]) : [];

    return parsed
      .map((item) => normalizeCustomTheme(item))
      .filter(Boolean) as CustomTheme[];
  } catch {
    return [];
  }
}

function getCustomThemePaletteKey(theme: CustomTheme) {
  return JSON.stringify({
    mode: theme.mode,
    palette: theme.palette,
  });
}

function getFallbackThemeName() {
  const adjectives = ["Brisk", "Quiet", "Bright", "Deep", "Soft", "Wild"];
  const nouns = ["Signal", "Canvas", "Archive", "Circuit", "Ledger", "Paper"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective} ${noun}`;
}

async function generateThemeName() {
  try {
    const { uniqueNamesGenerator, adjectives, colors, animals } = await import(
      "unique-names-generator"
    );

    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 3,
      separator: " ",
      style: "capital",
    });
  } catch {
    return getFallbackThemeName();
  }
}

function shouldIgnoreKeyboardShortcut(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest("input, textarea, select, [contenteditable], [role='textbox']"),
  );
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function pointFromPointer(
  event: ReactPointerEvent<HTMLDivElement>,
  glow: number,
): ConceptPoint {
  const rect = event.currentTarget.getBoundingClientRect();
  const voltage = clamp01((event.clientX - rect.left) / rect.width);
  const entropy = clamp01(1 - (event.clientY - rect.top) / rect.height);

  return {
    voltage: Number(voltage.toFixed(3)),
    entropy: Number(entropy.toFixed(3)),
    glow,
  };
}

function formatConceptValue(value: number) {
  return Math.round(value * 100);
}

function getConceptPointKey(point: ConceptPoint) {
  return [
    formatConceptValue(point.voltage),
    formatConceptValue(point.entropy),
    formatConceptValue(point.glow),
  ].join("-");
}

function getPaletteKey(palette: Palette) {
  return fields.map(({ key }) => palette[key]).join("|");
}

function findPresetForPalette(mode: ThemeMode, palette: Palette) {
  const paletteKey = getPaletteKey(palette);

  return modePresets[mode].find(
    (preset) => getPaletteKey(preset.palette) === paletteKey,
  );
}

const springTransition =
  "560ms cubic-bezier(0.22, 1.38, 0.36, 1)";
const directColorTransition =
  "background-color 120ms linear, border-color 120ms linear, box-shadow 120ms linear";
const conceptDragThreshold = 4;

type ConceptPointerIntent = {
  hasDragged: boolean;
  point: ConceptPoint;
  x: number;
  y: number;
};

function Swatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden="true"
      className="size-3 shrink-0 border [border-color:var(--theme-lab-border)]"
      style={{ backgroundColor: value }}
    />
  );
}

function ConceptPadPoint({
  color,
  isPrimary = false,
  motion,
  palette,
  point,
}: {
  color: string;
  isPrimary?: boolean;
  motion: ConceptMotion;
  palette: Palette;
  point: ConceptPoint;
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        "pointer-events-none absolute rounded-full border-[3px]",
        isPrimary ? "size-9" : "size-6 opacity-95",
      ].join(" ")}
      style={{
        left: `${point.voltage * 100}%`,
        bottom: `${point.entropy * 100}%`,
        transform: "translate(-50%, 50%)",
        transition:
          motion === "spring"
            ? [
                `left ${springTransition}`,
                `bottom ${springTransition}`,
                `background-color ${springTransition}`,
                `border-color ${springTransition}`,
                `box-shadow ${springTransition}`,
              ].join(", ")
            : directColorTransition,
        backgroundColor: color,
        borderColor: palette.surface,
        boxShadow: isPrimary
          ? `0 4px 10px color-mix(in srgb, ${palette.shadow} 42%, transparent)`
          : `0 3px 8px color-mix(in srgb, ${color} 18%, transparent)`,
      }}
    />
  );
}

function ConceptHarmonyPoints({
  motion,
  palette,
  points,
}: {
  motion: ConceptMotion;
  palette: Palette;
  points: [ConceptPoint, ConceptPoint, ConceptPoint];
}) {
  const swatches = [
    { color: palette.accent, isPrimary: true, key: "primary", point: points[0] },
    { color: palette.muted, key: "secondary", point: points[1] },
    { color: palette.subtle, key: "tertiary", point: points[2] },
  ];

  return (
    <span className="pointer-events-none absolute inset-0">
      {swatches
        .slice(1)
        .map((swatch) => (
          <ConceptPadPoint
            key={swatch.key}
            color={swatch.color}
            motion={motion}
            palette={palette}
            point={swatch.point}
          />
        ))}
      <ConceptPadPoint
        color={swatches[0].color}
        isPrimary
        motion={motion}
        palette={palette}
        point={swatches[0].point}
      />
    </span>
  );
}

function ConceptGlowSlider({
  motion,
  palette,
  value,
  onChange,
}: {
  motion: ConceptMotion;
  palette: Palette;
  value: number;
  onChange: (value: number, motion?: ConceptMotion) => void;
}) {
  const percentage = formatConceptValue(value);

  return (
    <label className="mt-3 block border p-2 [border-color:var(--theme-lab-border)]">
      <span className="mb-2 flex items-center justify-between font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]">
        <span>Paper</span>
        <span>Glow</span>
      </span>
      <span className="relative block h-7">
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 [background:var(--theme-lab-border)]"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2"
          style={{
            width: `${percentage}%`,
            backgroundColor: palette.accent,
            transition:
              motion === "spring"
                ? `width ${springTransition}, background-color ${springTransition}`
                : "background-color 120ms linear",
          }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          className="peer absolute inset-0 z-10 h-7 w-full cursor-pointer opacity-0"
          onChange={(event) =>
            onChange(Number(event.currentTarget.value) / 100, "direct")
          }
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-accent/45"
          style={{
            left: `${percentage}%`,
            backgroundColor: palette.accent,
            borderColor: palette.surface,
            boxShadow: `0 4px 10px color-mix(in srgb, ${palette.accent} 28%, transparent)`,
            transition:
              motion === "spring"
                ? [
                    `left ${springTransition}`,
                    `background-color ${springTransition}`,
                    `border-color ${springTransition}`,
                    `box-shadow ${springTransition}`,
                  ].join(", ")
                : directColorTransition,
          }}
        />
      </span>
    </label>
  );
}

export default function ThemeRandomizer({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isConceptPadUnlocked, setIsConceptPadUnlocked] = useState(false);
  const [activeLabTab, setActiveLabTab] = useState<"tokens" | "mood">(
    "tokens",
  );
  const [discovered, setDiscovered] = useState(false);
  const [dailyEnabled, setDailyEnabled] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ThemeMode>("light");
  const [values, setValues] = useState<ThemeValues>(originalTheme);
  const [conceptPoint, setConceptPoint] = useState<ConceptPoint>(
    modePresets.light.find((preset) => preset.id === "original")?.point ??
      fallbackConceptPoint,
  );
  const [conceptMotion, setConceptMotion] = useState<ConceptMotion>("spring");
  const [historyItems, setHistoryItems] = useState<ThemeValues[]>([]);
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [hasUnsavedCustomTheme, setHasUnsavedCustomTheme] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [themeName, setThemeName] = useState("");
  const [isGeneratingName, setIsGeneratingName] = useState(false);
  const valuesRef = useRef(values);
  const labRef = useRef<HTMLDivElement | null>(null);
  const historyMenuRef = useRef<HTMLDivElement | null>(null);
  const conceptPointerIntentRef = useRef<ConceptPointerIntent | null>(null);

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
    const initialMode = getActiveMode();
    const initialDiscovered =
      window.localStorage.getItem(FOUND_STORAGE_KEY) === "true";

    setValues(initialTheme);
    setDailyEnabled(initialDailyEnabled);
    setSelectedMode(initialMode);
    setConceptPoint(
      findPresetForPalette(initialMode, initialTheme[initialMode])?.point ??
        fallbackConceptPoint,
    );
    setHistoryItems(loadHistory());
    setCustomThemes(loadCustomThemes());
    setDiscovered(initialDiscovered);
    setFoundAttribute(initialDiscovered);
    applyTheme(initialTheme);

    const observer = new MutationObserver(() => {
      const mode = getActiveMode();
      const preset = findPresetForPalette(mode, valuesRef.current[mode]);

      setSelectedMode(mode);

      if (preset) {
        setConceptMotion("spring");
        setConceptPoint(preset.point);
      }

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
      const mode = getActiveMode();

      setDailyEnabled(false);
      setHasUnsavedCustomTheme(false);
      setIsSaveOpen(false);
      setConceptMotion("spring");
      setConceptPoint(
        modePresets[mode].find((preset) => preset.id === "original")?.point ??
          fallbackConceptPoint,
      );
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
      setIsSaveOpen(false);
      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const currentPalette = values[selectedMode];
  const conceptPalette = currentPalette;
  const conceptHarmonyPoints = getConceptHarmonyPoints(conceptPoint);
  const activeConceptKey = getConceptPointKey(conceptPoint);
  const selectedModeCustomThemes = customThemes.filter(
    (theme) => theme.mode === selectedMode,
  );
  const showDiscoveryTrigger = currentPath === "/work" && !discovered;

  function openLab() {
    setDiscovered(true);
    setIsOpen(true);
  }

  function unlockConceptPad() {
    setIsConceptPadUnlocked(true);
    setActiveLabTab("mood");
    setIsHistoryOpen(false);
  }

  function clearCustomDraft() {
    setHasUnsavedCustomTheme(false);
    setIsSaveOpen(false);
    setThemeName("");
  }

  function markCustomDraft() {
    setHasUnsavedCustomTheme(true);
    setIsSaveOpen(false);
  }

  async function openSaveForm() {
    setIsSaveOpen(true);
    setIsGeneratingName(true);

    const generatedName = await generateThemeName();

    setThemeName((current) => current || generatedName);
    setIsGeneratingName(false);
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

    clearCustomDraft();
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
    clearCustomDraft();
    setValues(previousTheme);
    window.localStorage.setItem(
      CURRENT_STORAGE_KEY,
      JSON.stringify(previousTheme),
    );
    applyTheme(previousTheme);
  }

  function applyPreset(preset: PalettePreset, mode: ThemeMode) {
    disableDailyTheme();
    clearCustomDraft();
    setConceptMotion("spring");
    setConceptPoint(preset.point);

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
    markCustomDraft();

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
    const preset = findPresetForPalette(mode, valuesRef.current[mode]);

    setSelectedMode(mode);

    if (preset) {
      setConceptMotion("spring");
      setConceptPoint(preset.point);
    }

    window.astroThemeToggle?.setTheme(mode);
    window.requestAnimationFrame(() => syncChromeTheme(valuesRef.current));
  }

  function randomizeMode() {
    disableDailyTheme();
    markCustomDraft();
    setConceptMotion("spring");

    const nextPoint = makeRandomConceptPoint();
    const next = {
      ...values,
      id: `random-${selectedMode}-${Date.now()}`,
      name: `Shuffle ${selectedMode}`,
      [selectedMode]: makeConceptPalette(selectedMode, nextPoint),
    };

    setConceptPoint(nextPoint);
    setValues(next);
    saveHistory(next);
  }

  function applyConceptPoint(
    nextPoint: ConceptPoint,
    motion: ConceptMotion = "spring",
  ) {
    disableDailyTheme();
    markCustomDraft();
    setConceptMotion(motion);
    setConceptPoint(nextPoint);

    setValues((current) => ({
      ...current,
      id: `mood-${selectedMode}-${formatConceptValue(nextPoint.voltage)}-${formatConceptValue(nextPoint.entropy)}-${formatConceptValue(nextPoint.glow)}`,
      name: `Mood ${formatConceptValue(nextPoint.voltage)} / ${formatConceptValue(nextPoint.entropy)} / ${formatConceptValue(nextPoint.glow)}`,
      [selectedMode]: makeConceptPalette(selectedMode, nextPoint),
    }));
  }

  function handleConceptPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);

    conceptPointerIntentRef.current = {
      hasDragged: false,
      point: pointFromPointer(event, conceptPoint.glow),
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleConceptPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const intent = conceptPointerIntentRef.current;

    if (!intent || event.buttons !== 1) {
      return;
    }

    const distance = Math.hypot(event.clientX - intent.x, event.clientY - intent.y);

    if (distance < conceptDragThreshold && !intent.hasDragged) {
      return;
    }

    intent.hasDragged = true;
    applyConceptPoint(pointFromPointer(event, conceptPoint.glow), "direct");
  }

  function handleConceptPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const intent = conceptPointerIntentRef.current;

    if (!intent) {
      return;
    }

    conceptPointerIntentRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (intent.hasDragged) {
      setConceptMotion("spring");
      return;
    }

    applyConceptPoint(intent.point, "spring");
  }

  function handleConceptPointerCancel(event: ReactPointerEvent<HTMLDivElement>) {
    conceptPointerIntentRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setConceptMotion("spring");
  }

  function updateConceptGlow(value: number, motion: ConceptMotion = "spring") {
    applyConceptPoint(
      {
        ...conceptPoint,
        glow: Number(clamp01(value).toFixed(3)),
      },
      motion,
    );
  }

  function reset() {
    disableDailyTheme();
    clearCustomDraft();
    setConceptMotion("spring");
    setConceptPoint(
      modePresets[selectedMode].find((preset) => preset.id === "original")
        ?.point ?? fallbackConceptPoint,
    );
    setValues(originalTheme);
    window.localStorage.removeItem(CURRENT_STORAGE_KEY);
    applyTheme(originalTheme);
  }

  function applyHistoryItem(item: ThemeValues) {
    const preset = findPresetForPalette(selectedMode, item[selectedMode]);

    disableDailyTheme();
    clearCustomDraft();

    if (preset) {
      setConceptMotion("spring");
      setConceptPoint(preset.point);
    }

    setValues(item);
    window.localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(item));
    applyTheme(item);
    setIsHistoryOpen(false);
  }

  function applyCustomTheme(item: CustomTheme) {
    disableDailyTheme();
    clearCustomDraft();
    const theme = {
      ...values,
      id: `${item.id}-applied-${Date.now()}`,
      name: item.name,
      [item.mode]: item.palette,
    };

    setValues(theme);
    window.localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(theme));
    applyTheme(theme);
    saveHistory(theme);
  }

  function deleteCustomTheme(themeId: string) {
    setCustomThemes((current) => {
      const updated = current.filter((item) => item.id !== themeId);

      window.localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function saveCustomTheme(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = themeName.trim() || getFallbackThemeName();
    const savedTheme = {
      id: `custom-${selectedMode}-${Date.now()}`,
      name,
      mode: selectedMode,
      palette: values[selectedMode],
    };
    const theme = {
      ...values,
      id: `${savedTheme.id}-applied`,
      name,
    };
    const paletteKey = getCustomThemePaletteKey(savedTheme);

    setValues(theme);
    setCustomThemes((current) => {
      const matchingModeThemes = current.filter(
        (item) => item.mode === selectedMode,
      );
      const otherModeThemes = current.filter(
        (item) => item.mode !== selectedMode,
      );
      const updated = [
        savedTheme,
        ...matchingModeThemes.filter(
          (item) => getCustomThemePaletteKey(item) !== paletteKey,
        ),
      ].slice(0, CUSTOM_THEME_LIMIT_PER_MODE);
      const nextThemes = [...updated, ...otherModeThemes];

      window.localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(nextThemes));
      return nextThemes;
    });
    saveHistory(theme);
    clearCustomDraft();
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        !event.shiftKey ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        shouldIgnoreKeyboardShortcut(event.target)
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (!["t", "l", "d", "s", "y", "r"].includes(key)) {
        return;
      }

      event.preventDefault();

      if (key === "t") {
        setDiscovered(true);
        setIsHistoryOpen(false);
        setIsOpen((current) => {
          if (current) {
            setIsSaveOpen(false);
          }

          return !current;
        });
        return;
      }

      if (key === "l") {
        selectMode("light");
        return;
      }

      if (key === "d") {
        selectMode("dark");
        return;
      }

      if (key === "s") {
        randomizeMode();
        return;
      }

      if (key === "r") {
        reset();
        return;
      }

      toggleDailyTheme();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      {!isOpen && showDiscoveryTrigger && (
        <button
          type="button"
          className="theme-lab-discovery-trigger fixed right-3 top-1/2 z-[60] hidden -translate-y-1/2 items-center gap-2 border px-2 py-3 font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-35 shadow-lg backdrop-blur transition [background:color-mix(in_srgb,var(--theme-lab-bg)_72%,transparent)] [border-color:var(--theme-lab-border)] [box-shadow:0_18px_42px_var(--theme-lab-shadow)] [color:var(--theme-lab-muted)] hover:border-accent hover:text-accent hover:opacity-100 focus-visible:opacity-100 xl:flex"
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
            className="relative w-[min(25rem,calc(100vw-2rem))] overflow-hidden border backdrop-blur [background:var(--theme-lab-bg)] [border-color:var(--theme-lab-border)] [box-shadow:0_24px_80px_var(--theme-lab-shadow)]"
          >
            <header className="flex items-center justify-between border-b px-3 py-2 [border-color:var(--theme-lab-border)]">
              <button
                type="button"
                className="flex items-center gap-2 border-0 bg-transparent p-0 font-geist-mono text-xs font-bold text-inherit"
                onDoubleClick={unlockConceptPad}
                title="Theme Lab"
              >
                <i className="ph ph-palette" aria-hidden="true" />
                Theme Lab
              </button>
              <div className="flex items-center gap-1.5">
                {hasUnsavedCustomTheme && !isSaveOpen && (
                  <button
                    type="button"
                    className="inline-flex h-7 items-center gap-1.5 border px-2 font-geist-mono text-[0.625rem] transition-colors [border-color:var(--theme-lab-border)] hover:border-accent hover:text-accent"
                    onClick={() => void openSaveForm()}
                  >
                    <i className="ph ph-floppy-disk" aria-hidden="true" />
                    Save
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex size-7 items-center justify-center transition-colors [color:var(--theme-lab-muted)] hover:text-accent"
                  onClick={() => {
                    setIsHistoryOpen(false);
                    setIsSaveOpen(false);
                    setIsOpen(false);
                  }}
                  title="Collapse"
                >
                  <i className="ph ph-x" aria-hidden="true" />
                  <span className="sr-only">Collapse</span>
                </button>
              </div>
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
                        ? "bg-accent [color:var(--theme-accent-foreground)]"
                        : "[color:var(--theme-lab-muted)] hover:text-accent",
                    ].join(" ")}
                    onClick={() => selectMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {isConceptPadUnlocked && (
                <div className="mt-3 grid grid-cols-2 gap-1 border p-1 [border-color:var(--theme-lab-border)]">
                  {(["tokens", "mood"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={[
                        "px-3 py-2 font-geist-mono text-xs capitalize transition-colors",
                        activeLabTab === tab
                          ? "bg-accent [color:var(--theme-accent-foreground)]"
                          : "[color:var(--theme-lab-muted)] hover:text-accent",
                      ].join(" ")}
                      onClick={() => setActiveLabTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}

              {activeLabTab === "tokens" ? (
                <>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 border px-2 py-2 font-geist-mono text-[0.6875rem] transition-colors [border-color:var(--theme-lab-border)] hover:border-accent hover:text-accent"
                  onClick={randomizeMode}
                >
                  <i className="ph ph-shuffle" aria-hidden="true" />
                  <span className="truncate">Shuffle</span>
                </button>
                <button
                  type="button"
                  className={[
                    "inline-flex min-w-0 items-center justify-center gap-1.5 border px-2 py-2 font-geist-mono text-[0.6875rem] transition-colors",
                    dailyEnabled
                      ? "border-accent bg-accent [color:var(--theme-accent-foreground)] hover:bg-accent hover:[color:var(--theme-accent-foreground)]"
                      : "[border-color:var(--theme-lab-border)] hover:border-accent hover:text-accent",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={toggleDailyTheme}
                  aria-pressed={dailyEnabled}
                >
                  <i className="ph ph-calendar-blank" aria-hidden="true" />
                  <span className="truncate">Daily</span>
                </button>
                <button
                  type="button"
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 border px-2 py-2 font-geist-mono text-[0.6875rem] transition-colors [border-color:var(--theme-lab-border)] hover:border-accent hover:text-accent"
                  onClick={reset}
                >
                  <i className="ph ph-arrow-counter-clockwise" aria-hidden="true" />
                  <span className="truncate">Reset</span>
                </button>
                <div ref={historyMenuRef} className="relative min-w-0">
                  <button
                    type="button"
                    className="inline-flex w-full min-w-0 items-center justify-center gap-1.5 border px-2 py-2 font-geist-mono text-[0.6875rem] transition-colors [border-color:var(--theme-lab-border)] hover:border-accent hover:text-accent"
                    onClick={() => setIsHistoryOpen((current) => !current)}
                    aria-expanded={isHistoryOpen}
                  >
                    <i className="ph ph-clock-counter-clockwise" aria-hidden="true" />
                    <span className="truncate">History</span>
                  </button>

                  {isHistoryOpen && (
                    <div className="absolute right-0 top-[calc(100%+0.5rem)] z-10 w-[min(21rem,calc(100vw-2rem))] border p-2 [background:var(--theme-lab-solid-bg)] [border-color:var(--theme-lab-border)] [box-shadow:0_18px_48px_var(--theme-lab-shadow)]">
                      <div className="mb-2 flex items-center justify-between font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]">
                        <span>Recent</span>
                        <span>{historyItems.length}/8</span>
                      </div>
                      {historyItems.length === 0 ? (
                        <p className="m-0 p-2 text-xs [color:var(--theme-lab-muted)]">
                          Shuffle or pick presets to build history.
                        </p>
                      ) : (
                        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                          {historyItems.map((item) => {
                            const palette = item[selectedMode];

                            return (
                              <button
                                key={item.id}
                                type="button"
                                className="group w-full border px-2 py-2 text-left transition-colors [border-color:var(--theme-lab-border)] hover:border-accent focus-visible:border-accent"
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
                                <span className="mt-2 block font-geist-mono text-[0.5625rem] uppercase tracking-[0.16em] [color:var(--theme-lab-muted)] group-hover:text-accent">
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
                      className="flex min-h-12 items-center gap-2 border px-2 py-2 text-left transition-colors [border-color:var(--theme-lab-border)] hover:border-accent"
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

              {selectedModeCustomThemes.length > 0 && (
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]">
                    <span>{selectedMode} custom</span>
                    <span>
                      {selectedModeCustomThemes.length}/
                      {CUSTOM_THEME_LIMIT_PER_MODE}
                    </span>
                  </div>
                  <div className="grid max-h-32 grid-cols-2 gap-2 overflow-y-auto pr-1">
                    {selectedModeCustomThemes.map((theme) => (
                      <div
                        key={theme.id}
                        className="grid min-h-12 grid-cols-[1fr_auto] border [border-color:var(--theme-lab-border)]"
                      >
                        <button
                          type="button"
                          className="flex min-w-0 items-center gap-2 px-2 py-2 text-left transition-colors hover:text-accent"
                          onClick={() => applyCustomTheme(theme)}
                        >
                          <span className="flex gap-1">
                            <Swatch value={theme.palette.base} />
                            <Swatch value={theme.palette.accent} />
                            <Swatch value={theme.palette.line} />
                          </span>
                          <span className="min-w-0 truncate font-geist-mono text-[0.6875rem] leading-tight">
                            {theme.name}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="flex w-8 items-center justify-center border-l transition-colors [border-color:var(--theme-lab-border)] [color:var(--theme-lab-muted)] hover:text-accent"
                          onClick={() => deleteCustomTheme(theme.id)}
                          title={`Delete ${theme.name}`}
                        >
                          <i className="ph ph-trash" aria-hidden="true" />
                          <span className="sr-only">Delete {theme.name}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                </>
              ) : (
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]">
                    <span>Mood</span>
                    <span>
                      {formatConceptValue(conceptPoint.voltage)} /{" "}
                      {formatConceptValue(conceptPoint.entropy)} /{" "}
                      {formatConceptValue(conceptPoint.glow)}
                    </span>
                  </div>
                  <div
                    className="relative aspect-square touch-none select-none overflow-hidden border [border-color:var(--theme-lab-border)]"
                    role="application"
                    aria-label="Calm to voltage and order to entropy mood field"
                    onPointerDown={handleConceptPointerDown}
                    onPointerMove={handleConceptPointerMove}
                    onPointerUp={handleConceptPointerUp}
                    onPointerCancel={handleConceptPointerCancel}
                    style={{
                      backgroundColor: conceptPalette.surface,
                      backgroundImage: [
                        `radial-gradient(color-mix(in srgb, ${conceptPalette.line} 58%, transparent) 1px, transparent 1px)`,
                        `linear-gradient(to right, color-mix(in srgb, ${conceptPalette.surface} 88%, ${conceptPalette.line}), color-mix(in srgb, ${conceptPalette.accent} 22%, ${conceptPalette.surface}))`,
                        `linear-gradient(to top, color-mix(in srgb, ${conceptPalette.base} 92%, ${conceptPalette.ink}), color-mix(in srgb, ${conceptPalette.accent} 16%, ${conceptPalette.surface}))`,
                      ].join(", "),
                      backgroundSize: "8px 8px, 100% 100%, 100% 100%",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 [background:var(--theme-lab-border)]"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
                        maskImage:
                          "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 [background:var(--theme-lab-border)]"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
                        maskImage:
                          "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
                      }}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 font-geist-mono text-[0.5625rem] uppercase tracking-[0.16em] [color:var(--theme-lab-muted)]">
                      Entropy
                    </div>
                    <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-geist-mono text-[0.5625rem] uppercase tracking-[0.16em] [color:var(--theme-lab-muted)]">
                      Order
                    </div>
                    <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 font-geist-mono text-[0.5625rem] uppercase tracking-[0.16em] [color:var(--theme-lab-muted)]">
                      Calm
                    </div>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-right font-geist-mono text-[0.5625rem] uppercase tracking-[0.16em] [color:var(--theme-lab-muted)]">
                      Voltage
                    </div>
                    <ConceptHarmonyPoints
                      motion={conceptMotion}
                      palette={conceptPalette}
                      points={conceptHarmonyPoints}
                    />
                    <span className="sr-only">
                      Voltage {formatConceptValue(conceptPoint.voltage)}, entropy{" "}
                      {formatConceptValue(conceptPoint.entropy)}, glow{" "}
                      {formatConceptValue(conceptPoint.glow)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    {modePresets[selectedMode].map((preset) => {
                      const isActive =
                        getConceptPointKey(preset.point) === activeConceptKey;

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          className={[
                            "flex size-7 shrink-0 items-center justify-center rounded-full border transition",
                            isActive
                              ? "border-accent"
                              : "[border-color:var(--theme-lab-border)] hover:border-accent",
                          ].join(" ")}
                          onClick={() => applyPreset(preset, selectedMode)}
                          title={preset.name}
                          aria-label={`${preset.name} preset mood point`}
                        >
                          <span
                            aria-hidden="true"
                            className="size-5 rounded-full border [border-color:var(--theme-lab-solid-bg)]"
                            style={{ backgroundColor: preset.palette.accent }}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <ConceptGlowSlider
                    motion={conceptMotion}
                    palette={conceptPalette}
                    value={conceptPoint.glow}
                    onChange={updateConceptGlow}
                  />
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {historySwatches.map((swatch) => (
                      <div
                        key={swatch.key}
                        className="min-w-0 border p-2 [border-color:var(--theme-lab-border)]"
                        title={`${swatch.label}: ${conceptPalette[swatch.key]}`}
                      >
                        <span
                          aria-hidden="true"
                          className="mb-1 block h-5 border [border-color:var(--theme-lab-border)]"
                          style={{
                            backgroundColor: conceptPalette[swatch.key],
                          }}
                        />
                        <span className="block truncate font-geist-mono text-[0.5625rem] uppercase tracking-[0.08em] [color:var(--theme-lab-muted)]">
                          {swatch.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isSaveOpen && (
              <div className="absolute inset-0 z-20 flex items-end p-3 [background:color-mix(in_srgb,var(--theme-lab-solid-bg)_92%,transparent)] backdrop-blur">
                <form
                  className="w-full border p-3 shadow-lg [background:var(--theme-lab-solid-bg)] [border-color:var(--theme-lab-border)] [box-shadow:0_18px_48px_var(--theme-lab-shadow)]"
                  onSubmit={saveCustomTheme}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      className="font-geist-mono text-[0.625rem] uppercase tracking-[0.18em] [color:var(--theme-lab-muted)]"
                      htmlFor="theme-lab-custom-name"
                    >
                      Theme name
                    </label>
                    <button
                      type="button"
                      className="inline-flex size-7 items-center justify-center transition-colors [color:var(--theme-lab-muted)] hover:text-accent"
                      onClick={() => {
                        setIsSaveOpen(false);
                        setThemeName("");
                      }}
                      title="Cancel"
                    >
                      <i className="ph ph-x" aria-hidden="true" />
                      <span className="sr-only">Cancel</span>
                    </button>
                  </div>
                  <input
                    id="theme-lab-custom-name"
                    type="text"
                    className="w-full border px-3 py-2 font-geist-mono text-sm outline-none [background:var(--theme-lab-bg)] [border-color:var(--theme-lab-border)] focus:border-accent"
                    value={themeName}
                    placeholder={
                      isGeneratingName ? "Generating name..." : "Custom theme"
                    }
                    onChange={(event) => setThemeName(event.currentTarget.value)}
                  />
                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      className="border px-3 py-2 font-geist-mono text-xs transition-colors [border-color:var(--theme-lab-border)] [color:var(--theme-lab-muted)] hover:border-accent hover:text-accent"
                      onClick={() => {
                        setIsSaveOpen(false);
                        setThemeName("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 border border-accent bg-accent px-3 py-2 font-geist-mono text-xs transition-colors [color:var(--theme-accent-foreground)]"
                    >
                      <i className="ph ph-floppy-disk" aria-hidden="true" />
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
