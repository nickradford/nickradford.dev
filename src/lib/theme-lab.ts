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

export type CustomTheme = {
  id: string;
  name: string;
  mode: ThemeMode;
  palette: Palette;
};

export type ConceptPoint = {
  voltage: number;
  entropy: number;
  glow: number;
};

type CodePalette = {
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  comment: string;
  punctuation: string;
  keyword: string;
  function: string;
  string: string;
  number: string;
  variable: string;
  operator: string;
  highlightBg: string;
  highlightBorder: string;
  insertedBg: string;
  insertedFg: string;
  deletedBg: string;
  deletedFg: string;
  success: string;
};

export type PalettePreset = {
  id: string;
  name: string;
  point: ConceptPoint;
  palette: Palette;
};

export const STYLE_ID = "theme-randomizer-style";
export const CURRENT_STORAGE_KEY = "theme-randomizer-current";
export const HISTORY_STORAGE_KEY = "theme-randomizer-history";
export const CUSTOM_STORAGE_KEY = "theme-randomizer-custom";
export const FOUND_STORAGE_KEY = "theme-randomizer-found";
export const DAILY_STORAGE_KEY = "theme-randomizer-daily";
export const THEME_STORAGE_KEY = "theme-toggle";
export const CUSTOM_THEME_LIMIT_PER_MODE = 4;

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
      point: { voltage: 0.58, entropy: 0.24, glow: 0.18 },
      palette: originalTheme.light,
    },
    {
      id: "classic-ivory",
      name: "Classic Ivory",
      point: { voltage: 0.48, entropy: 0.08, glow: 0.08 },
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
      point: { voltage: 0.7, entropy: 0.18, glow: 0.4 },
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
      point: { voltage: 0.36, entropy: 0.34, glow: 0.58 },
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
      point: { voltage: 0.56, entropy: 0.18, glow: 0.28 },
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
      point: { voltage: 0.22, entropy: 0.14, glow: 0.2 },
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
      point: { voltage: 0.82, entropy: 0.36, glow: 0.44 },
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
      point: { voltage: 0.44, entropy: 0.78, glow: 0.58 },
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
      point: { voltage: 0.68, entropy: 0.28, glow: 0.34 },
      palette: originalTheme.dark,
    },
    {
      id: "midnight-peach",
      name: "Midnight Peach",
      point: { voltage: 0.54, entropy: 0.46, glow: 0.62 },
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
      point: { voltage: 0.88, entropy: 0.18, glow: 0.54 },
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
      point: { voltage: 0.76, entropy: 0.24, glow: 0.38 },
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
      point: { voltage: 0.24, entropy: 0.18, glow: 0.26 },
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
      point: { voltage: 0.72, entropy: 0.54, glow: 0.52 },
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
      point: { voltage: 0.42, entropy: 0.86, glow: 0.42 },
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
      point: { voltage: 0.62, entropy: 0.14, glow: 0.32 },
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

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (value: number) =>
    Math.round(clamp(value, 0, 255))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHex(from: string, to: string, amount: number) {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const mixAmount = clamp01(amount);

  return rgbToHex({
    r: lerp(start.r, end.r, mixAmount),
    g: lerp(start.g, end.g, mixAmount),
    b: lerp(start.b, end.b, mixAmount),
  });
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

function getContrastRatio(foreground: string, background: string) {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);
  const light = Math.max(foregroundLuminance, backgroundLuminance);
  const dark = Math.min(foregroundLuminance, backgroundLuminance);

  return (light + 0.05) / (dark + 0.05);
}

function getReadableColor(color: string, background: string, minContrast = 4.5) {
  if (getContrastRatio(color, background) >= minContrast) {
    return color;
  }

  const target = getRelativeLuminance(background) > 0.5 ? "#111111" : "#ffffff";

  for (let amount = 0.08; amount <= 1; amount += 0.04) {
    const candidate = mixHex(color, target, amount);

    if (getContrastRatio(candidate, background) >= minContrast) {
      return candidate;
    }
  }

  return target;
}

function getCodePalette(palette: Palette, mode: ThemeMode): CodePalette {
  const isDark = mode === "dark";
  const bg = isDark
    ? mixHex(palette.base, palette.surface, 0.34)
    : mixHex(palette.surface, palette.ink, 0.07);
  const surface = isDark
    ? mixHex(bg, palette.accent, 0.14)
    : mixHex(bg, palette.accent, 0.08);
  const border = isDark
    ? mixHex(bg, palette.accent, 0.32)
    : mixHex(bg, palette.accent, 0.22);
  const text = getReadableColor(palette.ink, bg, 7);
  const muted = getReadableColor(palette.subtle, bg, 3.25);
  const comment = getReadableColor(mixHex(palette.subtle, text, 0.2), bg, 4.5);
  const punctuation = getReadableColor(mixHex(palette.muted, text, 0.16), bg, 4.5);
  const keyword = getReadableColor(palette.accent, bg, 4.75);
  const functionColor = getReadableColor(
    mixHex(palette.accent, text, isDark ? 0.22 : 0.34),
    bg,
    4.75,
  );
  const stringColor = getReadableColor(
    mixHex(palette.muted, palette.accent, isDark ? 0.3 : 0.46),
    bg,
    4.5,
  );
  const number = getReadableColor(
    mixHex(palette.accent, text, isDark ? 0.12 : 0.24),
    bg,
    4.75,
  );
  const variable = getReadableColor(
    mixHex(palette.muted, palette.accent, isDark ? 0.42 : 0.3),
    bg,
    4.5,
  );
  const operator = getReadableColor(
    mixHex(palette.subtle, palette.accent, isDark ? 0.26 : 0.18),
    bg,
    4.5,
  );
  const success = getReadableColor(isDark ? "#34d399" : "#047857", bg, 4.5);
  const deletedFg = getReadableColor(isDark ? "#fca5a5" : "#b91c1c", bg, 4.5);

  return {
    bg,
    surface,
    border,
    text,
    muted,
    comment,
    punctuation,
    keyword,
    function: functionColor,
    string: stringColor,
    number,
    variable,
    operator,
    highlightBg: isDark
      ? mixHex(bg, palette.accent, 0.18)
      : mixHex(bg, palette.accent, 0.1),
    highlightBorder: keyword,
    insertedBg: mixHex(bg, "#10b981", isDark ? 0.18 : 0.12),
    insertedFg: success,
    deletedBg: mixHex(bg, "#ef4444", isDark ? 0.18 : 0.12),
    deletedFg,
    success,
  };
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

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function wrapHue(value: number) {
  return ((value % 360) + 360) % 360;
}

function smooth(value: number) {
  const clamped = clamp01(value);

  return clamped * clamped * (3 - 2 * clamped);
}

function hslToken(h: number, s: number, l: number) {
  return hslToHex(wrapHue(h), clamp(s, 0, 100), clamp(l, 0, 100));
}

function normalizePointValue(value: number) {
  return Number(clamp01(value).toFixed(3));
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

export function makeRandomConceptPoint(random = Math.random): ConceptPoint {
  return {
    voltage: normalizePointValue(randomBetween(0.04, 0.96, random)),
    entropy: normalizePointValue(randomBetween(0.06, 0.96, random)),
    glow: normalizePointValue(randomBetween(0.08, 0.94, random)),
  };
}

export function makeRandomPalette(
  mode: ThemeMode,
  random = Math.random,
): Palette {
  return makeConceptPalette(mode, makeRandomConceptPoint(random));
}

function rotateConceptPoint(point: ConceptPoint, turns: number): ConceptPoint {
  const angle = turns * Math.PI * 2;
  const dx = point.voltage - 0.5;
  const dy = point.entropy - 0.5;
  const nextX = 0.5 + dx * Math.cos(angle) - dy * Math.sin(angle);
  const nextY = 0.5 + dx * Math.sin(angle) + dy * Math.cos(angle);
  const fit = Math.max(Math.abs(nextX - 0.5), Math.abs(nextY - 0.5));
  const scale = fit > 0.48 ? 0.48 / fit : 1;

  return {
    voltage: normalizePointValue(0.5 + (nextX - 0.5) * scale),
    entropy: normalizePointValue(0.5 + (nextY - 0.5) * scale),
    glow: point.glow,
  };
}

export function getConceptHarmonyPoints(
  point: ConceptPoint,
): [ConceptPoint, ConceptPoint, ConceptPoint] {
  const primary = {
    voltage: normalizePointValue(point.voltage),
    entropy: normalizePointValue(point.entropy),
    glow: normalizePointValue(point.glow),
  };

  return [
    primary,
    rotateConceptPoint(primary, 1 / 3),
    rotateConceptPoint(primary, -1 / 3),
  ];
}

function getConceptPointHue(point: ConceptPoint) {
  const voltage = smooth(point.voltage);
  const entropy = smooth(point.entropy);
  const glow = smooth(point.glow);

  return wrapHue(
    222 -
      voltage * 176 +
      entropy * 88 +
      Math.sin((glow + entropy) * Math.PI) * 24,
  );
}

function getConceptAccentHue(point: ConceptPoint) {
  const voltage = smooth(point.voltage);
  const entropy = smooth(point.entropy);
  const glow = smooth(point.glow);
  const baseHue = getConceptPointHue(point);

  return wrapHue(
    baseHue + lerp(24, 172, entropy) + voltage * 42 + glow * 18,
  );
}

export function makeDailyTheme(dateKey = getLocalDateKey()): ThemeValues {
  return {
    id: `daily-${dateKey}`,
    name: `Daily ${dateKey}`,
    light: makeRandomPalette("light", createSeededRandom(`${dateKey}:light`)),
    dark: makeRandomPalette("dark", createSeededRandom(`${dateKey}:dark`)),
  };
}

export function makeConceptPalette(
  mode: ThemeMode,
  point: ConceptPoint,
): Palette {
  const [primaryPoint, secondaryPoint, tertiaryPoint] =
    getConceptHarmonyPoints(point);
  const voltage = smooth(point.voltage);
  const entropy = smooth(point.entropy);
  const glow = smooth(point.glow);
  const paper = 1 - glow;
  const energy = clamp01(voltage * 0.42 + entropy * 0.32 + glow * 0.26);
  const baseHue = getConceptPointHue(primaryPoint);
  const accentHue = getConceptAccentHue(primaryPoint);
  const companionHue = getConceptAccentHue(secondaryPoint);
  const lineHue = getConceptAccentHue(tertiaryPoint);
  const inkHue = wrapHue(baseHue + lerp(-8, 24, entropy));
  const baseChroma = lerp(3, 24, entropy) + glow * 8 + voltage * 5;
  const surfaceChroma = lerp(1, 18, entropy) + glow * 7;
  const accentChroma = lerp(52, 96, energy);

  if (mode === "dark") {
    return {
      base: hslToken(
        baseHue,
        baseChroma,
        lerp(3.5, 9, glow * 0.55 + entropy * 0.45),
      ),
      surface: hslToken(
        baseHue + glow * 10,
        surfaceChroma + 5,
        lerp(9, 18, glow * 0.62 + entropy * 0.38),
      ),
      accent: hslToken(
        accentHue,
        accentChroma,
        lerp(52, 72, glow * 0.45 + voltage * 0.35 + entropy * 0.2),
      ),
      ink: hslToken(
        inkHue,
        lerp(6, 22, entropy) + glow * 4,
        lerp(91, 98, paper * 0.48 + voltage * 0.52),
      ),
      muted: hslToken(
        companionHue,
        lerp(8, 28, entropy) + glow * 8,
        lerp(68, 86, glow * 0.5 + voltage * 0.5),
      ),
      subtle: hslToken(
        lineHue,
        lerp(8, 28, entropy) + glow * 8,
        lerp(38, 57, voltage * 0.4 + glow * 0.6),
      ),
      line: hslToken(
        companionHue,
        lerp(8, 36, entropy) + glow * 10,
        lerp(15, 30, entropy * 0.45 + glow * 0.55),
      ),
      shadow: "#000000",
    };
  }

  return {
    base: hslToken(
      baseHue,
      baseChroma,
      lerp(99.2, 94.5, entropy * 0.48 + glow * 0.52),
    ),
    surface: hslToken(
      baseHue - glow * 8 + paper * 6,
      surfaceChroma,
      lerp(100, 96.8, glow * 0.7 + entropy * 0.3),
    ),
    accent: hslToken(
      accentHue,
      accentChroma,
      lerp(34, 58, voltage * 0.44 + glow * 0.36 + entropy * 0.2),
    ),
    ink: hslToken(
      inkHue,
      lerp(8, 28, entropy) + voltage * 5,
      lerp(7, 15, paper * 0.58 + entropy * 0.42),
    ),
    muted: hslToken(
      companionHue,
      lerp(7, 24, entropy) + glow * 5,
      lerp(31, 47, voltage * 0.32 + glow * 0.42 + entropy * 0.26),
    ),
    subtle: hslToken(
      lineHue,
      lerp(7, 23, entropy) + glow * 8,
      lerp(46, 63, glow * 0.42 + entropy * 0.38 + voltage * 0.2),
    ),
    line: hslToken(
      companionHue,
      lerp(8, 36, entropy) + glow * 10,
      lerp(91, 80, entropy * 0.58 + glow * 0.42),
    ),
    shadow: hslToken(
      accentHue,
      lerp(10, 34, entropy) + glow * 8,
      lerp(10, 20, voltage * 0.4 + entropy * 0.38 + glow * 0.22),
    ),
  };
}

export function buildThemeCss(values: ThemeValues) {
  const lightShadow = hexToRgba(values.light.shadow, 0.08);
  const lightAccentShadow = hexToRgba(values.light.accent, 0.08);
  const lightAccentForeground = getAccentForeground(values.light.accent);
  const lightCode = getCodePalette(values.light, "light");
  const darkShadow = hexToRgba(values.dark.shadow, 0.42);
  const darkAccentShadow = hexToRgba(values.dark.accent, 0.12);
  const darkAccentForeground = getAccentForeground(values.dark.accent);
  const darkCode = getCodePalette(values.dark, "dark");

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
  --theme-code-bg: ${lightCode.bg};
  --theme-code-surface: ${lightCode.surface};
  --theme-code-border: ${lightCode.border};
  --theme-code-text: ${lightCode.text};
  --theme-code-muted: ${lightCode.muted};
  --theme-code-comment: ${lightCode.comment};
  --theme-code-punctuation: ${lightCode.punctuation};
  --theme-code-keyword: ${lightCode.keyword};
  --theme-code-function: ${lightCode.function};
  --theme-code-string: ${lightCode.string};
  --theme-code-number: ${lightCode.number};
  --theme-code-variable: ${lightCode.variable};
  --theme-code-operator: ${lightCode.operator};
  --theme-code-highlight-bg: ${lightCode.highlightBg};
  --theme-code-highlight-border: ${lightCode.highlightBorder};
  --theme-code-inserted-bg: ${lightCode.insertedBg};
  --theme-code-inserted-fg: ${lightCode.insertedFg};
  --theme-code-deleted-bg: ${lightCode.deletedBg};
  --theme-code-deleted-fg: ${lightCode.deletedFg};
  --theme-code-success: ${lightCode.success};
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
  --theme-code-bg: ${darkCode.bg};
  --theme-code-surface: ${darkCode.surface};
  --theme-code-border: ${darkCode.border};
  --theme-code-text: ${darkCode.text};
  --theme-code-muted: ${darkCode.muted};
  --theme-code-comment: ${darkCode.comment};
  --theme-code-punctuation: ${darkCode.punctuation};
  --theme-code-keyword: ${darkCode.keyword};
  --theme-code-function: ${darkCode.function};
  --theme-code-string: ${darkCode.string};
  --theme-code-number: ${darkCode.number};
  --theme-code-variable: ${darkCode.variable};
  --theme-code-operator: ${darkCode.operator};
  --theme-code-highlight-bg: ${darkCode.highlightBg};
  --theme-code-highlight-border: ${darkCode.highlightBorder};
  --theme-code-inserted-bg: ${darkCode.insertedBg};
  --theme-code-inserted-fg: ${darkCode.insertedFg};
  --theme-code-deleted-bg: ${darkCode.deletedBg};
  --theme-code-deleted-fg: ${darkCode.deletedFg};
  --theme-code-success: ${darkCode.success};
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
    rgbToHex,
    mixHex,
    hexToRgba,
    getRelativeLuminance,
    getAccentForeground,
    getContrastRatio,
    getReadableColor,
    getCodePalette,
    hslToHex,
    clamp01,
    clamp,
    lerp,
    wrapHue,
    smooth,
    hslToken,
    normalizePointValue,
    getLocalDateKey,
    hashSeed,
    createSeededRandom,
    randomBetween,
    makeRandomConceptPoint,
    rotateConceptPoint,
    getConceptHarmonyPoints,
    getConceptPointHue,
    getConceptAccentHue,
    makeRandomPalette,
    makeDailyTheme,
    makeConceptPalette,
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
