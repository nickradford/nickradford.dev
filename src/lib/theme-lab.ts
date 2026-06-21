export type ThemeMode = "light" | "dark";

export type Palette = {
  base: string;
  surface: string;
  accent: string;
  ink: string;
  muted: string;
  subtle: string;
  line: string;
  shadow: string;
};

export type ThemeValues = {
  id: string;
  name: string;
  light: Palette;
  dark: Palette;
};

export type PaletteField = keyof Palette;

type PalettePreset = {
  id: string;
  name: string;
  palette: Palette;
};

export const STYLE_ID = "theme-randomizer-style";
export const CURRENT_STORAGE_KEY = "theme-randomizer-current";
export const HISTORY_STORAGE_KEY = "theme-randomizer-history";
export const FOUND_STORAGE_KEY = "theme-randomizer-found";
export const DAILY_STORAGE_KEY = "theme-randomizer-daily";
export const THEME_STORAGE_KEY = "theme-toggle";

export const THEME_COLORS: Record<ThemeMode, string> = {
  dark: "#09090b",
  light: "#fafafa",
};

export const originalTheme: ThemeValues = {
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

export const modePresets: Record<ThemeMode, PalettePreset[]> = {
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

export const fields: Array<{ key: PaletteField; label: string }> = [
  { key: "base", label: "Base" },
  { key: "surface", label: "Surface" },
  { key: "accent", label: "Accent" },
  { key: "ink", label: "Ink" },
  { key: "muted", label: "Muted" },
  { key: "subtle", label: "Subtle" },
  { key: "line", label: "Line" },
  { key: "shadow", label: "Shadow" },
];

export const historySwatches: Array<{ key: PaletteField; label: string }> = [
  { key: "base", label: "Base" },
  { key: "surface", label: "Surface" },
  { key: "accent", label: "Accent" },
  { key: "ink", label: "Ink" },
];

export function hexToRgb(hex: string) {
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

export function hexToRgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

export function getRelativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (value: number) => {
    const channel = value / 255;

    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function getAccentForeground(accent: string) {
  return getRelativeLuminance(accent) > 0.42 ? "#09090b" : "#ffffff";
}

export function hslToHex(h: number, s: number, l: number) {
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

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function hashSeed(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function createSeededRandom(seed: string) {
  let state = hashSeed(seed);

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomBetween(
  min: number,
  max: number,
  random = Math.random,
) {
  return min + random() * (max - min);
}

export function pick<T>(items: T[], random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export function makeRandomPalette(
  mode: ThemeMode,
  random = Math.random,
): Palette {
  const baseHue = pick([22, 36, 48, 96, 152, 204, 244, 322], random);
  const accentHue =
    random() > 0.3
      ? baseHue + randomBetween(-48, 58, random)
      : pick([18, 28, 156, 188, 222, 262, 336], random);

  if (mode === "dark") {
    return {
      base: hslToHex(
        baseHue,
        randomBetween(8, 22, random),
        randomBetween(3, 8, random),
      ),
      surface: hslToHex(
        baseHue,
        randomBetween(8, 24, random),
        randomBetween(9, 15, random),
      ),
      accent: hslToHex(
        accentHue,
        randomBetween(62, 90, random),
        randomBetween(54, 68, random),
      ),
      ink: hslToHex(
        baseHue,
        randomBetween(6, 16, random),
        randomBetween(93, 98, random),
      ),
      muted: hslToHex(
        baseHue,
        randomBetween(8, 18, random),
        randomBetween(76, 86, random),
      ),
      subtle: hslToHex(
        baseHue,
        randomBetween(6, 16, random),
        randomBetween(42, 54, random),
      ),
      line: hslToHex(
        baseHue,
        randomBetween(8, 24, random),
        randomBetween(15, 23, random),
      ),
      shadow: "#000000",
    };
  }

  return {
    base: hslToHex(
      baseHue,
      randomBetween(4, 16, random),
      randomBetween(96, 99, random),
    ),
    surface: hslToHex(
      baseHue,
      randomBetween(0, 8, random),
      randomBetween(99, 100, random),
    ),
    accent: hslToHex(
      accentHue,
      randomBetween(62, 88, random),
      randomBetween(38, 50, random),
    ),
    ink: hslToHex(
      baseHue,
      randomBetween(8, 22, random),
      randomBetween(8, 15, random),
    ),
    muted: hslToHex(
      baseHue,
      randomBetween(7, 17, random),
      randomBetween(34, 43, random),
    ),
    subtle: hslToHex(
      baseHue,
      randomBetween(6, 14, random),
      randomBetween(48, 56, random),
    ),
    line: hslToHex(
      baseHue,
      randomBetween(7, 18, random),
      randomBetween(86, 92, random),
    ),
    shadow: hslToHex(
      baseHue,
      randomBetween(8, 24, random),
      randomBetween(8, 16, random),
    ),
  };
}

export function makeDailyTheme(dateKey = getLocalDateKey()): ThemeValues {
  return {
    id: `daily-${dateKey}`,
    name: `Daily ${dateKey}`,
    light: makeRandomPalette("light", createSeededRandom(`${dateKey}:light`)),
    dark: makeRandomPalette("dark", createSeededRandom(`${dateKey}:dark`)),
  };
}

export function buildThemeCss(values: ThemeValues) {
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

function mergePalette(base: Palette, incoming: Partial<Palette> = {}): Palette {
  return { ...base, ...incoming };
}

export function normalizeTheme(value: unknown): ThemeValues | null {
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

export function serializeTheme(values: ThemeValues) {
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

export function getThemeValues(value: unknown): ThemeValues | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Partial<ThemeValues> & { values?: ThemeValues };

  if (raw.light && raw.dark) {
    return raw as ThemeValues;
  }

  if (raw.values?.light && raw.values?.dark) {
    return raw.values;
  }

  return null;
}

export function getThemeLabPreloadScript() {
  const functionSources = [
    hexToRgb,
    hexToRgba,
    getRelativeLuminance,
    getAccentForeground,
    hslToHex,
    getLocalDateKey,
    hashSeed,
    createSeededRandom,
    randomBetween,
    pick,
    makeRandomPalette,
    makeDailyTheme,
    getThemeValues,
    buildThemeCss,
  ]
    .map((fn) => fn.toString())
    .join("\n\n");

  return `
(() => {
  const root = document.documentElement;
  const themeStorageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  const themeLabCurrentKey = ${JSON.stringify(CURRENT_STORAGE_KEY)};
  const themeLabDailyKey = ${JSON.stringify(DAILY_STORAGE_KEY)};
  const themeLabFoundKey = ${JSON.stringify(FOUND_STORAGE_KEY)};
  const styleId = ${JSON.stringify(STYLE_ID)};
  const themeColors = ${JSON.stringify(THEME_COLORS)};

${functionSources}

  function getStoredTheme() {
    const theme = localStorage.getItem(themeStorageKey);
    return theme === "dark" || theme === "light" ? theme : null;
  }

  function getActiveTheme() {
    return getStoredTheme() || "dark";
  }

  function setThemeChrome(theme, color) {
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.style.backgroundColor = color;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    themeColorMeta?.setAttribute("content", color);

    const appleStatusBarMeta = document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]',
    );
    appleStatusBarMeta?.setAttribute(
      "content",
      theme === "dark" ? "black-translucent" : "default",
    );
  }

  try {
    if (localStorage.getItem(themeLabFoundKey) === "true") {
      root.dataset.themeLabFound = "true";
    }

    const activeTheme = getActiveTheme();
    setThemeChrome(activeTheme, themeColors[activeTheme]);

    const dailyThemeEnabled = localStorage.getItem(themeLabDailyKey) === "true";
    const storedThemeLab = localStorage.getItem(themeLabCurrentKey);
    const themeValues = dailyThemeEnabled
      ? makeDailyTheme()
      : storedThemeLab
        ? getThemeValues(JSON.parse(storedThemeLab))
        : null;

    if (themeValues) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = buildThemeCss(themeValues);
      document.head.appendChild(style);
      localStorage.setItem(themeLabCurrentKey, JSON.stringify(themeValues));
      setThemeChrome(activeTheme, themeValues[activeTheme].base);
    }
  } catch {
    setThemeChrome("dark", themeColors.dark);
  }

  if (window.location.hash) {
    root.dataset.initialHashScroll = "true";
  }
})();
`.trim();
}
