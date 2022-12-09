type ImageProps = {
  title?: string;
  subtitle?: string;
  date?: string;
  readTime?: string;
  showName?: boolean;
  showSubtitle?: boolean;
};

function coerceBoolToString(key: string, val: boolean) {
  if (val !== null && val !== undefined) {
    return { [key]: val ? "1" : "0" };
  }
  return {};
}

export function getImage(props: ImageProps) {
  const qs = new URLSearchParams({
    ...props,
    ...coerceBoolToString("showName", props.showName),
    ...coerceBoolToString("showSubtitle", props.showSubtitle),
  } as undefined as Record<string, string>);

  const protocol =
    process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined ? "https" : "http";

  return `${protocol}://${
    process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
  }/api/og?${qs.toString()}`;
}
