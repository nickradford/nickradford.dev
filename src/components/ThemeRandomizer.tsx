import { useEffect, useRef, useState } from "react";

type ThemeMode = "light" | "dark";

type Palette = {
  base: string;
  surface: string;
  accent: string;
  ink: string;
  muted: string;
  subtle: string;
  line: string;
  shadow: string;
};

type ThemeValues = {
  id: string;
  name: string;
  light: Palette;
  dark: Palette;
};

type PaletteField = keyof Palette;

type PalettePreset = {
  id: string;
  name: string;
  palette: Palette;
};

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

const STYLE_ID = "theme-randomizer-style";
const CURRENT_STORAGE_KEY = "theme-randomizer-current";
const HISTORY_STORAGE_KEY = "theme-randomizer-history";
const FOUND_STORAGE_KEY = "theme-randomizer-found";

const originalTheme: ThemeValues = {
  id: "original",
  name: "Original",
  light: {
    base: "#fafafa",
    surface: "#ffffff",
    accent: "#f97316",
    ink: "#18181b",
    muted: "#52525b",
    subtle: "#71717a",
    line: "#e4e4e7",
    shadow: "#18181b",
  },
  dark: {
    base: "#09090b",
    surface: "#18181b",
    accent: "#ff9500",
    ink: "#f4f4f5",
    muted: "#d4d4d8",
    subtle: "#71717a",
    line: "#27272a",
    shadow: "#000000",
  },
};

const modePresets: Record<ThemeMode, PalettePreset[]> = {
  light: [
    {
      id: "original",
      name: "Original",
      palette: originalTheme.light,
    },
    {
      id: "classic-ivory",
      name: "Classic Ivory",
      palette: {
        base: "#fffff0",
        surface: "#fffff0",
        accent: "#ff9500",
        ink: "#18181b",
        muted: "#52525b",
        subtle: "#71717a",
        line: "#f3ddb8",
        shadow: "#ff9500",
      },
    },
    {
      id: "blue-note",
      name: "Blue Note",
      palette: {
        base: "#f1f7ff",
        surface: "#ffffff",
        accent: "#2563eb",
        ink: "#102033",
        muted: "#40556e",
        subtle: "#6f8296",
        line: "#cfe0f5",
        shadow: "#0f172a",
      },
    },
    {
      id: "blush-code",
      name: "Blush Code",
      palette: {
        base: "#fff5f7",
        surface: "#ffffff",
        accent: "#db2777",
        ink: "#2a1018",
        muted: "#684456",
        subtle: "#936b7c",
        line: "#f2d4dc",
        shadow: "#2a1018",
      },
    },
    {
      id: "slate-mist",
      name: "Slate Mist",
      palette: {
        base: "#f8fafc",
        surface: "#ffffff",
        accent: "#0f766e",
        ink: "#0f172a",
        muted: "#475569",
        subtle: "#64748b",
        line: "#dbe4ed",
        shadow: "#0f172a",
      },
    },
    {
      id: "sage-paper",
      name: "Sage Paper",
      palette: {
        base: "#fbfbf4",
        surface: "#fffffb",
        accent: "#4d7c0f",
        ink: "#1a1c18",
        muted: "#4f5548",
        subtle: "#737a6b",
        line: "#e1e5d7",
        shadow: "#1a1c18",
      },
    },
    {
      id: "oxblood-print",
      name: "Oxblood Print",
      palette: {
        base: "#fff8f7",
        surface: "#ffffff",
        accent: "#be123c",
        ink: "#241113",
        muted: "#60484d",
        subtle: "#80686d",
        line: "#f1ddde",
        shadow: "#241113",
      },
    },
    {
      id: "lilac-terminal",
      name: "Lilac Terminal",
      palette: {
        base: "#fcf8ff",
        surface: "#ffffff",
        accent: "#7c3aed",
        ink: "#211630",
        muted: "#5d4b73",
        subtle: "#837095",
        line: "#eadff7",
        shadow: "#211630",
      },
    },
  ],
  dark: [
    {
      id: "original",
      name: "Original",
      palette: originalTheme.dark,
    },
    {
      id: "midnight-peach",
      name: "Midnight Peach",
      palette: {
        base: "#080b1a",
        surface: "#12172b",
        accent: "#ffb4a2",
        ink: "#f7f4ec",
        muted: "#d8d0c4",
        subtle: "#817a91",
        line: "#242a45",
        shadow: "#000000",
      },
    },
    {
      id: "circuit-lime",
      name: "Circuit Lime",
      palette: {
        base: "#070a12",
        surface: "#121826",
        accent: "#bef264",
        ink: "#f7fee7",
        muted: "#d9f99d",
        subtle: "#7a8562",
        line: "#252f3d",
        shadow: "#000000",
      },
    },
    {
      id: "slate-neon",
      name: "Slate Neon",
      palette: {
        base: "#020617",
        surface: "#0f172a",
        accent: "#2dd4bf",
        ink: "#f8fafc",
        muted: "#cbd5e1",
        subtle: "#64748b",
        line: "#1e293b",
        shadow: "#000000",
      },
    },
    {
      id: "sage-terminal",
      name: "Sage Terminal",
      palette: {
        base: "#0d100b",
        surface: "#191d16",
        accent: "#84cc16",
        ink: "#f7fbef",
        muted: "#d9decf",
        subtle: "#77806b",
        line: "#293022",
        shadow: "#000000",
      },
    },
    {
      id: "oxblood-night",
      name: "Oxblood Night",
      palette: {
        base: "#120609",
        surface: "#241113",
        accent: "#fb7185",
        ink: "#fff7f8",
        muted: "#f2cdd3",
        subtle: "#9f6b75",
        line: "#3f1d24",
        shadow: "#000000",
      },
    },
    {
      id: "violet-void",
      name: "Violet Void",
      palette: {
        base: "#0d0718",
        surface: "#1b112b",
        accent: "#a78bfa",
        ink: "#faf7ff",
        muted: "#ddd6fe",
        subtle: "#7c6aa5",
        line: "#302144",
        shadow: "#000000",
      },
    },
    {
      id: "blueprint",
      name: "Blueprint",
      palette: {
        base: "#07111f",
        surface: "#0f1d33",
        accent: "#38bdf8",
        ink: "#f0f9ff",
        muted: "#bae6fd",
        subtle: "#647f9f",
        line: "#1d3555",
        shadow: "#000000",
      },
    },
  ],
};

const fields: Array<{ key: PaletteField; label: string }> = [
  { key: "base", label: "Base" },
  { key: "surface", label: "Surface" },
  { key: "accent", label: "Accent" },
  { key: "ink", label: "Ink" },
  { key: "muted", label: "Muted" },
  { key: "subtle", label: "Subtle" },
  { key: "line", label: "Line" },
  { key: "shadow", label: "Shadow" },
];

const historySwatches: Array<{ key: PaletteField; label: string }> = [
  { key: "base", label: "Base" },
  { key: "surface", label: "Surface" },
  { key: "accent", label: "Accent" },
  { key: "ink", label: "Ink" },
];

function ensureThemeStyle() {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  return style;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const expanded =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;
  const numeric = Number.parseInt(expanded, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
}

function hexToRgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

function getRelativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (value: number) => {
    const channel = value / 255;

    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getAccentForeground(accent: string) {
  return getRelativeLuminance(accent) > 0.42 ? "#09090b" : "#ffffff";
}

function hslToHex(h: number, s: number, l: number) {
  const normalizedHue = (((h % 360) + 360) % 360) / 360;
  const saturation = s / 100;
  const lightness = l / 100;
  const hueToRgb = (p: number, q: number, t: number) => {
    let adjustedT = t;

    if (adjustedT < 0) adjustedT += 1;
    if (adjustedT > 1) adjustedT -= 1;
    if (adjustedT < 1 / 6) return p + (q - p) * 6 * adjustedT;
    if (adjustedT < 1 / 2) return q;
    if (adjustedT < 2 / 3) return p + (q - p) * (2 / 3 - adjustedT) * 6;
    return p;
  };

  let r = lightness;
  let g = lightness;
  let b = lightness;

  if (saturation !== 0) {
    const q =
      lightness < 0.5
        ? lightness * (1 + saturation)
        : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    r = hueToRgb(p, q, normalizedHue + 1 / 3);
    g = hueToRgb(p, q, normalizedHue);
    b = hueToRgb(p, q, normalizedHue - 1 / 3);
  }

  const toHex = (value: number) =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeRandomPalette(mode: ThemeMode): Palette {
  const baseHue = pick([22, 36, 48, 96, 152, 204, 244, 322]);
  const accentHue =
    Math.random() > 0.3
      ? baseHue + randomBetween(-48, 58)
      : pick([18, 28, 156, 188, 222, 262, 336]);

  if (mode === "dark") {
    return {
      base: hslToHex(baseHue, randomBetween(8, 22), randomBetween(3, 8)),
      surface: hslToHex(baseHue, randomBetween(8, 24), randomBetween(9, 15)),
      accent: hslToHex(accentHue, randomBetween(62, 90), randomBetween(54, 68)),
      ink: hslToHex(baseHue, randomBetween(6, 16), randomBetween(93, 98)),
      muted: hslToHex(baseHue, randomBetween(8, 18), randomBetween(76, 86)),
      subtle: hslToHex(baseHue, randomBetween(6, 16), randomBetween(42, 54)),
      line: hslToHex(baseHue, randomBetween(8, 24), randomBetween(15, 23)),
      shadow: "#000000",
    };
  }

  return {
    base: hslToHex(baseHue, randomBetween(4, 16), randomBetween(96, 99)),
    surface: hslToHex(baseHue, randomBetween(0, 8), randomBetween(99, 100)),
    accent: hslToHex(accentHue, randomBetween(62, 88), randomBetween(38, 50)),
    ink: hslToHex(baseHue, randomBetween(8, 22), randomBetween(8, 15)),
    muted: hslToHex(baseHue, randomBetween(7, 17), randomBetween(34, 43)),
    subtle: hslToHex(baseHue, randomBetween(6, 14), randomBetween(48, 56)),
    line: hslToHex(baseHue, randomBetween(7, 18), randomBetween(86, 92)),
    shadow: hslToHex(baseHue, randomBetween(8, 24), randomBetween(8, 16)),
  };
}

function buildThemeCss(values: ThemeValues) {
  const lightShadow = hexToRgba(values.light.shadow, 0.08);
  const lightAccentShadow = hexToRgba(values.light.accent, 0.08);
  const lightAccentForeground = getAccentForeground(values.light.accent);
  const darkShadow = hexToRgba(values.dark.shadow, 0.42);
  const darkAccentShadow = hexToRgba(values.dark.accent, 0.12);
  const darkAccentForeground = getAccentForeground(values.dark.accent);

  return `
html:not(.dark) {
  --color-ivory: ${values.light.base};
  --color-orange: ${values.light.accent};
  --theme-accent-foreground: ${lightAccentForeground};
  --theme-lab-bg: color-mix(in srgb, ${values.light.surface} 94%, transparent);
  --theme-lab-solid-bg: ${values.light.surface};
  --theme-lab-border: color-mix(in srgb, ${values.light.line} 82%, transparent);
  --theme-lab-ink: ${values.light.ink};
  --theme-lab-muted: ${values.light.subtle};
  --theme-lab-shadow: ${hexToRgba(values.light.shadow, 0.1)};
  --color-orange-300: color-mix(in srgb, ${values.light.accent} 58%, white);
  --color-orange-400: color-mix(in srgb, ${values.light.accent} 76%, white);
  --color-orange-500: ${values.light.accent};
  --color-orange-600: color-mix(in srgb, ${values.light.accent} 88%, black);
  --color-orange-700: color-mix(in srgb, ${values.light.accent} 74%, black);
  --color-zinc-950: ${values.light.ink};
  --color-zinc-900: ${values.light.ink};
  --color-zinc-800: ${values.light.ink};
  --color-zinc-700: ${values.light.muted};
  --color-zinc-600: ${values.light.muted};
  --color-zinc-500: ${values.light.subtle};
  --color-zinc-400: ${values.light.subtle};
  --color-zinc-300: ${values.light.line};
  --color-zinc-200: ${values.light.line};
  --color-zinc-100: ${values.light.surface};
  --color-zinc-50: ${values.light.surface};
}

html.dark {
  --color-ivory: ${values.light.base};
  --color-orange: ${values.dark.accent};
  --theme-accent-foreground: ${darkAccentForeground};
  --theme-lab-bg: color-mix(in srgb, ${values.dark.surface} 94%, transparent);
  --theme-lab-solid-bg: ${values.dark.surface};
  --theme-lab-border: color-mix(in srgb, ${values.dark.line} 82%, transparent);
  --theme-lab-ink: ${values.dark.ink};
  --theme-lab-muted: ${values.dark.subtle};
  --theme-lab-shadow: ${hexToRgba(values.dark.shadow, 0.42)};
  --color-orange-300: color-mix(in srgb, ${values.dark.accent} 74%, white);
  --color-orange-400: ${values.dark.accent};
  --color-orange-500: color-mix(in srgb, ${values.dark.accent} 88%, white);
  --color-orange-600: color-mix(in srgb, ${values.dark.accent} 72%, black);
  --color-orange-700: color-mix(in srgb, ${values.dark.accent} 58%, black);
  --color-zinc-950: ${values.dark.base};
  --color-zinc-900: ${values.dark.surface};
  --color-zinc-800: ${values.dark.line};
  --color-zinc-700: ${values.dark.line};
  --color-zinc-600: ${values.dark.subtle};
  --color-zinc-500: ${values.dark.subtle};
  --color-zinc-400: ${values.dark.muted};
  --color-zinc-300: ${values.dark.muted};
  --color-zinc-200: ${values.dark.ink};
  --color-zinc-100: ${values.dark.ink};
  --color-zinc-50: ${values.dark.ink};
}

html:not(.dark),
html:not(.dark) body {
  background-color: ${values.light.base};
}

html.dark,
html.dark body {
  background-color: ${values.dark.base};
}

html:not(.dark) .border-orange\\/20,
html:not(.dark) .border-orange\\/25,
html:not(.dark) .border-orange\\/30,
html:not(.dark) .border-t-orange\\/20,
html:not(.dark) .border-y-orange\\/20,
html:not(.dark) .border-r-orange\\/20,
html:not(.dark) .border-l-orange\\/20 {
  border-color: ${values.light.line} !important;
}

html:not(.dark) .divide-orange\\/20 > :not([hidden]) ~ :not([hidden]),
html:not(.dark) .divide-orange\\/20 > :not(:last-child) {
  border-color: ${values.light.line} !important;
}

html:not(.dark) .shadow-orange\\/10 {
  --tw-shadow-color: ${lightAccentShadow} !important;
}

html:not(.dark) .shadow-zinc-900\\/5,
html:not(.dark) .shadow-zinc-900\\/10 {
  --tw-shadow-color: ${lightShadow} !important;
}

html:not(.dark) .bg-orange.text-zinc-950,
html:not(.dark) .bg-orange.text-zinc-900,
html:not(.dark) .bg-orange.text-zinc-800,
html:not(.dark) .bg-orange\\/85.text-zinc-800,
html:not(.dark) .bg-orange .text-zinc-950,
html:not(.dark) .bg-orange .text-zinc-900,
html:not(.dark) .bg-orange .text-zinc-800 {
  color: ${lightAccentForeground} !important;
}

html.dark .shadow-orange\\/10 {
  --tw-shadow-color: ${darkAccentShadow} !important;
}

html.dark .shadow-zinc-900\\/5,
html.dark .shadow-zinc-900\\/10,
html.dark .dark\\:shadow-zinc-950\\/40,
html.dark .dark\\:shadow-black\\/40,
html.dark .dark\\:shadow-black\\/50 {
  --tw-shadow-color: ${darkShadow} !important;
}

html.dark .bg-orange.text-zinc-950,
html.dark .bg-orange.text-zinc-900,
html.dark .bg-orange.text-zinc-800,
html.dark .bg-orange\\/85.text-zinc-800,
html.dark .bg-orange .text-zinc-950,
html.dark .bg-orange .text-zinc-900,
html.dark .bg-orange .text-zinc-800 {
  color: ${darkAccentForeground} !important;
}
`.trim();
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

function mergePalette(base: Palette, incoming: Partial<Palette> = {}): Palette {
  return { ...base, ...incoming };
}

function normalizeTheme(value: unknown): ThemeValues | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Partial<ThemeValues> & Partial<Palette>;

  if (raw.light || raw.dark) {
    return {
      ...originalTheme,
      ...raw,
      light: mergePalette(originalTheme.light, raw.light),
      dark: mergePalette(originalTheme.dark, raw.dark),
    };
  }

  if (raw.base || raw.accent) {
    return {
      ...originalTheme,
      id: raw.id ?? `migrated-${Date.now()}`,
      name: raw.name ?? "Migrated",
      light: mergePalette(originalTheme.light, raw),
    };
  }

  return null;
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

function serializeTheme(values: ThemeValues) {
  return JSON.stringify(
    {
      name: values.name,
      values: {
        light: values.light,
        dark: values.dark,
      },
      css: buildThemeCss(values),
    },
    null,
    2,
  );
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
    const storedTheme = loadStoredTheme();
    const initialTheme = storedTheme ?? originalTheme;
    const initialDiscovered =
      window.localStorage.getItem(FOUND_STORAGE_KEY) === "true";

    setValues(initialTheme);
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

  function applyPreset(
    preset: { id: string; name: string; palette: Palette },
    mode: ThemeMode,
  ) {
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
    setValues(originalTheme);
    window.localStorage.removeItem(CURRENT_STORAGE_KEY);
    applyTheme(originalTheme);
  }

  function applyHistoryItem(item: ThemeValues) {
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
